// js/script.js
// Módulo responsável pela animação de ícones na página principal.

const SPEED = 2;
const HITBOX_PADDING = 1;
const MARGIN = 30;

let icons = [];
let velocities = [];
let iconSources = ['img/Image1.png', 'img/Image2.png', 'img/Image3.png', 'img/Image4.png', 'img/Image5.png', 'img/Image6.png', 'img/Image7.png', 'img/Image8.png']; // Caminhos corrigidos

function determineIconCount() {
  const width = window.innerWidth;
  if (width <= 480) return 3;
  if (width <= 768) return 6;
  if (width <= 1024) return 10;
  return 15;
}

function createIcon(src) {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('icon');
  img.style.position = 'absolute'; // Adiciona position absolute para que o left/top funcionem
  img.style.left = `${MARGIN + Math.random() * (window.innerWidth - 2 * MARGIN)}px`;
  img.style.top = `${MARGIN + Math.random() * (window.innerHeight - 2 * MARGIN)}px`;
  document.body.appendChild(img);
  return img;
}

function initializeIcons() {
  // Remove ícones existentes antes de inicializar novos
  document.querySelectorAll('.icon').forEach(el => el.remove());
  icons = [];
  velocities = [];
  const iconCount = determineIconCount();

  for (let i = 0; i < iconCount; i++) {
    const img = createIcon(iconSources[i % iconSources.length]);
    icons.push(img);

    let angle = Math.random() * 2 * Math.PI;
    let dx = Math.cos(angle) * SPEED;
    let dy = Math.sin(angle) * SPEED;

    velocities.push({ dx: Math.abs(dx) < 0.1 ? 0.1 : dx, dy: Math.abs(dy) < 0.1 ? 0.1 : dy });
  }
}

function willCollide(el1, el2) {
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();
  return !(
    r1.right + HITBOX_PADDING < r2.left - HITBOX_PADDING ||
    r1.left - HITBOX_PADDING > r2.right + HITBOX_PADDING ||
    r1.bottom + HITBOX_PADDING < r2.top - HITBOX_PADDING ||
    r1.top - HITBOX_PADDING > r2.bottom + HITBOX_PADDING
  );
}

function normalizeVector(vector) {
  const length = Math.hypot(vector.dx, vector.dy);
  if (length === 0) {
    vector.dx = SPEED;
    vector.dy = 0;
  } else {
    vector.dx = (vector.dx / length) * SPEED;
    vector.dy = (vector.dy / length) * SPEED;
  }
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function repelVectors(velocity, collisionVector, strength = 0.1) {
  velocity.dx = lerp(velocity.dx, collisionVector.dx * SPEED, strength);
  velocity.dy = lerp(velocity.dy, collisionVector.dy * SPEED, strength);
}

function animate() {
  icons.forEach((icon, i) => {
    const rect = icon.getBoundingClientRect();
    let left = icon.offsetLeft + velocities[i].dx;
    let top = icon.offsetTop + velocities[i].dy;

    icons.forEach((otherIcon, j) => {
      if (i !== j && willCollide(icon, otherIcon)) {
        const separationX = icon.offsetLeft - otherIcon.offsetLeft;
        const separationY = icon.offsetTop - otherIcon.offsetTop;
        const length = Math.hypot(separationX, separationY) || 1;
        const repelVector = {
          dx: separationX / length,
          dy: separationY / length
        };
        repelVectors(velocities[i], repelVector);
      }
    });

    // Colisão com as bordas da janela
    if (left <= MARGIN || left + rect.width >= window.innerWidth - MARGIN) velocities[i].dx *= -1;
    if (top <= MARGIN || top + rect.height >= window.innerHeight - MARGIN) velocities[i].dy *= -1;

    normalizeVector(velocities[i]);

    icon.style.left = `${Math.min(Math.max(left, MARGIN), window.innerWidth - rect.width - MARGIN)}px`;
    icon.style.top = `${Math.min(Math.max(top, MARGIN), window.innerHeight - rect.height - MARGIN)}px`;
  });

  requestAnimationFrame(animate);
}

// Inicializa os ícones e a animação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initializeIcons();
  enableDragging();
  animate();
});

window.addEventListener('resize', () => {
  // Não precisa remover e adicionar no resize se initializeIcons já faz isso
  initializeIcons();
  enableDragging();
});

function enableDragging() {
  icons.forEach((icon) => {
    icon.addEventListener('mousedown', function(e) {
      e.preventDefault();
      const shiftX = e.clientX - icon.getBoundingClientRect().left;
      const shiftY = e.clientY - icon.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        icon.style.left = `${Math.min(window.innerWidth - icon.offsetWidth - MARGIN, Math.max(MARGIN, pageX - shiftX))}px`;
        icon.style.top = `${Math.min(window.innerHeight - icon.offsetHeight - MARGIN, Math.max(MARGIN, pageY - shiftY))}px`;
      }

      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
      }, { once: true });
    });

    icon.ondragstart = () => false;
  });
}
