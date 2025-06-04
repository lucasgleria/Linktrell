import { registerClick } from './core/clicker-tracker.js'; // Importa a função de registro de cliques

const socialLinks = [
  { href: '#', img: 'https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png', alt: 'WhatsApp', label: 'Meu WhatsApp' },
  { href: '#', img: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png', alt: 'Instagram', label: 'Meu Instagram' },
  { href: '#', img: 'https://img.icons8.com/ios-filled/50/ffffff/tiktok.png', alt: 'TikTok', label: 'Meu TikTok' },
  { href: '#', img: 'https://img.icons8.com/ios-filled/50/ffffff/twitterx.png', alt: 'X', label: 'Meu X' },
  { href: '#', img: 'https://img.icons8.com/ios-filled/50/ffffff/pinterest--v1.png', alt: 'Pinterest', label: 'Meu Pinterest' }
];

// Adiciona um listener para garantir que o DOM esteja totalmente carregado antes de manipular os elementos.
document.addEventListener('DOMContentLoaded', () => {
  const linksContainer = document.getElementById('links-container');

  // Verifica se o container de links existe antes de tentar adicionar elementos
  if (linksContainer) {
    socialLinks.forEach(({ href, img, alt, label }) => {
      const a = document.createElement('a');
      a.href = href;
      a.className = 'flex items-center bg-orange-400 text-white py-3 rounded-full hover:bg-orange-500 transition relative';
      a.innerHTML = `<img src="${img}" alt="${alt}" class="w-5 h-5 absolute left-10"><span class="flex-grow text-center">${label}</span>`;

      a.addEventListener('click', () => {
        // Passa o país detectado pelo servidor (disponível em window.userCountry)
        registerClick(label, window.userCountry);
      });

      linksContainer.appendChild(a);
    });
  } else {
    console.error('Elemento #links-container não encontrado no DOM.');
  }
});