/* ============================================================
 *  GMU Bone Lab — main.js
 *  - 双语切换 (zh / en)，记忆到 localStorage
 *  - 移动端菜单
 *  - 滚动进入动画
 *  - 联系表单 mailto:
 * ============================================================ */
(function () {
  'use strict';

  /* -------- Language switch -------- */
  const STORAGE_KEY = 'gmu-bonelab-lang';
  const I18N = window.I18N || {};
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'zh';

  function applyLang(lang) {
    if (!I18N[lang]) lang = 'zh';
    currentLang = lang;
    document.documentElement.lang = (lang === 'zh') ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = I18N[lang][key];
      if (typeof val === 'string') {
        // Allow embedded HTML for things like <strong>...
        el.innerHTML = val;
      }
    });
    localStorage.setItem(STORAGE_KEY, lang);
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(currentLang);

    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        applyLang(currentLang === 'zh' ? 'en' : 'zh');
      });
    }

    /* -------- Mobile menu -------- */
    const menuBtn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', () => menu.classList.toggle('open'));
      menu.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => menu.classList.remove('open'))
      );
    }

    /* -------- Reveal on scroll -------- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('visible'));
    }

    /* -------- Publications tab switch -------- */
    const tabContainer = document.getElementById('pub-tabs');
    if (tabContainer) {
      const buttons = tabContainer.querySelectorAll('.tab-btn');
      const panels = document.querySelectorAll('.tab-panel');
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-tab');
          buttons.forEach((b) => b.classList.toggle('active', b === btn));
          panels.forEach((p) => p.classList.toggle('active', p.getAttribute('data-panel') === target));
        });
      });
    }

    /* -------- Gallery carousel + lightbox -------- */
    const track = document.getElementById('gallery-track');
    if (track) {
      // Carousel arrows scroll one card at a time
      const galleryPrev = document.getElementById('gallery-prev');
      const galleryNext = document.getElementById('gallery-next');
      const scrollByOne = (dir) => {
        const item = track.querySelector('.gallery-item');
        const step = item ? item.getBoundingClientRect().width + 16 : 320;
        track.scrollBy({ left: dir * step, behavior: 'smooth' });
      };
      if (galleryPrev) galleryPrev.addEventListener('click', () => scrollByOne(-1));
      if (galleryNext) galleryNext.addEventListener('click', () => scrollByOne(1));

      // Photo data — full image filenames in order matching data-gallery-idx 0..15
      const PHOTOS = [
        '01-team-2021-expo', '02-lab-interior',
        '03-event-2021a', '04-event-2021b', '05-event-2021c',
        '06-event-2020a', '07-event-2020b', '08-event-2020c',
        '09-event-2020d', '10-event-2020e', '11-event-2020f', '12-event-2020g',
        '13-product-ha', '14-product-device', '15-product-ruiwei', '16-product-antislip',
      ];

      const lightbox = document.getElementById('gallery-lightbox');
      const lbImg    = document.getElementById('gallery-lightbox-img');
      const lbCap    = document.getElementById('gallery-lightbox-caption');
      const lbClose  = document.getElementById('gallery-lightbox-close');
      const lbPrev   = document.getElementById('gallery-lightbox-prev');
      const lbNext   = document.getElementById('gallery-lightbox-next');
      let currentIdx = 0;

      const captionFor = (idx) => {
        const key = `gallery.g${String(idx + 1).padStart(2, '0')}.title`;
        return (I18N[currentLang] && I18N[currentLang][key]) || '';
      };
      const showLightbox = (idx) => {
        currentIdx = (idx + PHOTOS.length) % PHOTOS.length;
        lbImg.src = `/assets/img/gallery/full-${PHOTOS[currentIdx]}.jpg`;
        lbCap.textContent = captionFor(currentIdx);
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
      };
      const hideLightbox = () => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = '';
      };

      track.querySelectorAll('.gallery-item').forEach((btn) => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.getAttribute('data-gallery-idx'), 10) || 0;
          showLightbox(i);
        });
      });

      if (lbClose) lbClose.addEventListener('click', hideLightbox);
      if (lbPrev)  lbPrev.addEventListener('click',  () => showLightbox(currentIdx - 1));
      if (lbNext)  lbNext.addEventListener('click',  () => showLightbox(currentIdx + 1));

      // Click outside image to close
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) hideLightbox();
      });

      // Keyboard support
      document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;
        if (e.key === 'Escape')      hideLightbox();
        if (e.key === 'ArrowLeft')   showLightbox(currentIdx - 1);
        if (e.key === 'ArrowRight')  showLightbox(currentIdx + 1);
      });
    }

    /* -------- Contact form (mailto fallback) -------- */
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const to = (I18N[currentLang]['contact.mail.v'] || 'bonelab@gmu.edu.cn').trim();
        const subject = encodeURIComponent('[Lab Website] ' + (fd.get('subject') || ''));
        const body = encodeURIComponent(
          'Name / 姓名: ' + (fd.get('name') || '') + '\n' +
          'Email / 邮箱: ' + (fd.get('email') || '') + '\n\n' +
          (fd.get('message') || '')
        );
        window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
      });
    }
  });
})();
