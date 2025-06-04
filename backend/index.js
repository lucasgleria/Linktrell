// backend/index.js

const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const geoip = require('geoip-lite');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'sua_senha_secreta_aqui',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));

// Middleware para determinar o país do usuário (JÁ EXISTENTE)
app.use((req, res, next) => {
  const ip = req.ip;
  console.log(`IP completo: ${ip}`); // Pode ser IPv6 com ::ffff: prefix
  const cleanIp = ip.replace('::ffff:', ''); // Limpa IP se necessário
  const geo = geoip.lookup(cleanIp);
  
  req.userCountry = geo ? geo.country : 'Unknown'; // Padronizar para inglês
  console.log(`País detectado: ${req.userCountry}, IP: ${cleanIp}`);
  next();
});

// NOVO Middleware para detectar o tipo de dispositivo do usuário
app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'];
  let deviceType = 'Unknown';

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    deviceType = 'Tablet';
  } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Source|Jasmine|Opera Mini|Pluckeye/i.test(userAgent)) {
    deviceType = 'Mobile';
  } else {
    deviceType = 'Desktop';
  }
  req.deviceType = deviceType; // Adiciona o tipo de dispositivo ao objeto req

  console.log(`[Backend DEBUG] User-Agent: ${userAgent}, Dispositivo detectado (req.deviceType): ${req.deviceType}`);
  next();
});


// Middleware de autenticação (JÁ EXISTENTE)
function isAuthenticated(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect('/login.html');
  }
}

// Função auxiliar para injetar variáveis no HTML (MODIFICADA)
function injectDynamicVarsIntoHtml(filePath, req, res) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Erro ao ler arquivo ${filePath}:`, err);
      return res.status(500).send('Erro interno do servidor.');
    }
    // MODIFICADO: Injeta window.userCountry E window.deviceType no <head>
    const modifiedHtml = data.replace(
      '</head>',
      `<script>
        window.userCountry = "${req.userCountry}";
        window.deviceType = "${req.deviceType}";
      </script>\n</head>`
    );
    console.log(`[Backend DEBUG] Injetando window.userCountry = "${req.userCountry}" e window.deviceType = "${req.deviceType}" em ${filePath} (no head)`);
    res.send(modifiedHtml);
  });
}

// --- ROTAS DE API --- (JÁ EXISTENTE)

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.post('/auth', (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: 'Senha obrigatória' });
  }

  const hash = crypto.createHash('sha256').update(password).digest('hex');
  const storedHash = process.env.PASSWORD_HASH;

  if (hash === storedHash) {
    req.session.authenticated = true;
    return res.json({ success: true, message: 'Autenticação bem-sucedida' });
  } else {
    return res.status(401).json({ success: false, message: 'Senha incorreta' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Falha ao fazer logout' });
    }
    res.json({ success: true, message: 'Logout bem-sucedido' });
  });
});

// --- ROTAS DE PÁGINAS HTML --- (MODIFICADA)

// Rota protegida para insights.html
app.get('/insights.html', isAuthenticated, (req, res) => {
  injectDynamicVarsIntoHtml(path.join(__dirname, '../insights.html'), req, res);
});

// Rotas para páginas HTML públicas (não protegidas)
app.get('/login.html', (req, res) => {
  injectDynamicVarsIntoHtml(path.join(__dirname, '../login.html'), req, res);
});

app.get('/index.html', (req, res) => {
  injectDynamicVarsIntoHtml(path.join(__dirname, '../index.html'), req, res);
});

// --- SERVINDO ARQUIVOS ESTÁTICOS --- (JÁ EXISTENTE)
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/img', express.static(path.join(__dirname, '../img')));

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});