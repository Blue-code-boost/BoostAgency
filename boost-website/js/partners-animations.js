// js/partners-animations.js
(() => {
  const onReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else { fn(); }
  };

  onReady(() => {
    const root  = document.querySelector('.partners-carousel');
    if (!root) return;

    const track = root.querySelector('.pc-track');
    const cards = Array.from(track.querySelectorAll('.partner-card'));
    if (!cards.length) return;

    // 1) Marcar estado inicial
    cards.forEach(c => c.classList.add('will-anim'));

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Revelar con transición garantizada (siguiente frame)
    const reveal = (card) => {
      if (card.classList.contains('inview')) return;
      // Asegura que el estado .will-anim se pintó
      card.getBoundingClientRect(); // fuerza layout
      requestAnimationFrame(() => {
        card.classList.add('inview');
        card.classList.remove('will-anim');
      });
    };

    // Visible en viewport
    const isInViewport = (el) => {
      const r  = el.getBoundingClientRect();
      const vw = window.innerWidth  || document.documentElement.clientWidth;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return (r.left < vw * 0.95) && (r.right > vw * 0.05) &&
             (r.top  < vh * 0.95) && (r.bottom > vh * 0.05);
    };

    const markVisible = () => {
      cards.forEach(c => { if (isInViewport(c)) reveal(c); });
    };

    // 2) IO + fallback
    if ('IntersectionObserver' in window && !prefersReduced) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) reveal(e.target); });
      }, { root: null, threshold: 0.1 });
      cards.forEach(c => io.observe(c));
    }

    // Primer chequeo en frames separados para no perder el estado inicial
    requestAnimationFrame(markVisible);
    setTimeout(markVisible, 120);

    // Scroll/resize listeners
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => { markVisible(); rafId = null; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Tras usar las flechas del carrusel
    ['.pc-prev', '.pc-next'].forEach(sel => {
      const btn = root.querySelector(sel);
      if (btn) btn.addEventListener('click', () => setTimeout(onScroll, 360));
    });
  });
})();
