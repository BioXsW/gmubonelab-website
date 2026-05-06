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
