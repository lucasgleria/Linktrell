# 🔗 Linktreell 

**Aplicação estilo Linktree desenvolvida em Javascript com Node.js, com foco em Análise e Visualização de Dados.**

[![Licença](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-5.0.6-green.svg)]()
[![Status](https://img.shields.io/badge/status-em_desenvolvimento-yellow.svg)]()
[![deploy](https://img.shields.io/badge/depoly-inactive-red.svg)]()

## 📌 Sumário

1. [Sobre o Projeto](#-sobre-o-projeto)  
2. [Objetivos](#-objetivos)  
3. [Tecnologias](#-tecnologias)  
4. [Funcionalidades](#-funcionalidades)  
5. [Pré-requisitos](#%EF%B8%8F-pré-requisitos)  
6. [Instalação](#%EF%B8%8F-instalação)  
7. [Como utilizar](#-como-utilizar)
8. [Estrutura do Projeto](#-estrutura-do-projeto)
9. [Contribuição](#-contribuição)  
10. [Licença](#-licença)  
11. [Contato](#-contato)  
12. [Recursos Adicionais](#-recursos-adicionais)  

## 💻 Sobre o Projeto  

O **Linktrell** é uma aplicação pessoal que replica as funcionalidades do Linktree, mas com um diferencial: o foco em **Análise e Visualização de Dados** utilizando Javascript e Node.js.

- *Motivação*: Aprimorar habilidades de desenvolvimento web, pensamento crítico e principalmente análise de dados.
- *Público-alvo*: Estudantes de programação, desenvolvedores iniciantes e analistas.

## 🎯 Objetivos  

### 🛠️ Técnicos  
- Implementar corretamente lógica de **BFF** (Back-end For Front-end)
- Garantir uma segurança mínima com Express, variáveis de ambiente, middleware de conexão e guarda de sessão.
- Gerar dashboards para analisar métricas e dados de forma visual e intuitiva.

## 🚀 Tecnologias  

*Núcleo do Sistema*  
- Javascript
- Node.js
- Express

## ✨ Funcionalidades  

- ✅ Tela inicial (index): A visualização pública do seu Linktree.
- ✅ Tela de login: Acesse rota de administração.
    - Senha: admin123 (para fins de demonstração).
- ✅ Tela de Insights: Visualize e avalie todas as métricas e painéis para análise de dados.
- ✅ Design descomplicado: Interface descomplicada e fácil de usar.

## ⚙️ Pré-requisitos  

- Node.js (Necessário que esteja instalado corretamente.)
- 2GB+ RAM (4GB recomendado)
- Conexão estável à internet  

## 🛠️ Instalação  

1. Clone o repositório:
```bash
git clone https://github.com/lucasgleria/linktrell.git
```

2. Navegue até o back-end:
```bash
cd backend
```

3. Construa o projeto:
```bash
npm init -y
```
4. Instale as dependencias do projeto:
```bash
npm install geoip-lite express-session dotenv cors express
```

5. Crie um arquivo ".env" na pasta backend:
```bash
# Cole ou faça o seu
PORT=3000
PASSWORD_HASH = 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9
SESSION_SECRET = 'sua_senha_secreta_aqui'
```
> Ps: O hash da senha (PASSWORD_HASH) está exposto porque a senha de acesso (admin123) já foi informada e esta aplicação não está em deploy.

## ❗ Como Utilizar

1. Navegue até o backend:
```bash
cd backend
```

2. Inicie o backend:
```bash
node index.js
```

3. Acesse no seu navegador:
- Página Principal: http://localhost:3000/index.html
- Página de Login: http://localhost:3000/login.html

### ▶️ Demonstração

![Dashbords](https://media.giphy.com/media/h8RDGogSns9wpOJFzR/giphy.gif?cid=ecf05e476nxbv9p2cgbsl4v39c1ub0m9p48va5hjt2p76ewm&rid=giphy.gif&ct=g)


_(Gif meramente ilustrativo)_

## 📂 Estrutura do Projeto  
```plaintext

├── backend/                    # Pasta de serviço backend  
├── css/                        # Pasta de estilização
├── img/                        # Pasta de mídia
├── js/                         # Pasta de lógica Javascript
│   ├── auth/                   # Pasta de segurança
│   ├── core/                   # Pasta delógica principal
│   ├── metrics/                # Pasta de lógica de métricas
│   |   |   ├── charts/         # Pasta de Lógica de Gráficos (Em construção) 
│   |   |   ├── data-analysis/  # Pasta de Lógica de Análise de dados
│   ├── utils/                  # Pasta de Funções utilitárias
├── index.html                  # Página principal
├── insights.html               # Página de análise de dados
├── login.html                  # Página de login   
├── LICENSE                     # Licença MIT  
└── README.md                   # Este arquivo
```

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estas etapas:  

1. **Reporte bugs**: Abra uma [issue](https://github.com/lucasgleria/linktrell/issues) no GitHub.  
2. **Sugira melhorias**: Envie ideias ou *pull requests* com novas funcionalidades.  
3. **Desenvolva**:  
   - Faça um *fork* do projeto.  
   - Crie uma branch (`git checkout -b feature/nova-funcionalidade`).  
   - Envie um *Pull Request*.  


## 📜 Licença  

MIT License - Veja [LICENSE](LICENSE) para detalhes.

## 📞 Contato & Evidências

- **Autor**: [Lucas Leria](https://github.com/lucasgleria)  
- **LinkedIn**: [lucasgleria](https://www.linkedin.com/in/lucasgleria/)  

## 🔍 Recursos Adicionais

- [Linktree](https://linktr.ee/) - Referência inicial
- [Node.js](https://nodejs.org/pt) - Documentação oficial
- [Express](https://expressjs.com/pt-br/) - Documentação oficial  
- [Geoip-lite](https://www.npmjs.com/package/geoip-lite) - Como instalar  
