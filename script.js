/* Lady Pu — Scripts */

// Mobile burger
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
  });
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('nav--open');
    }
  });
}

// Header shadow on scroll
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20
      ? '0 4px 30px rgba(0,0,0,0.5)'
      : 'none';
  });
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.card, .gallery__item, .faq__item, .c-row, .perk').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// VK News Widget — встраиваем последние посты из группы lady_pu
// Используем VK Open API без токена — публичные посты доступны через widget
if (typeof VK !== 'undefined') {
  VK.Widgets.Group("vk_news", {
    mode: 4,              // режим 4 = только посты (без заголовка группы)
    width: "auto",
    height: 600,
    color1: '0d0d0d',     // фон
    color2: 'e03580',     // акцент (ссылки, кнопки)
    color3: 'ffffff'      // текст
  }, 149092082);          // club ID для lady_pu (vk.com/lady_pu)
} else {
  // Если VK API не загрузился — показываем ссылку
  const vkNews = document.getElementById('vk_news');
  if (vkNews) {
    vkNews.innerHTML = '<p style="text-align:center;color:#888;padding:40px;">Новости загружаются... Если не появились — <a href="https://vk.com/lady_pu" target="_blank" rel="noopener" style="color:#e03580;">смотрите в нашем ВК</a></p>';
  }
}
