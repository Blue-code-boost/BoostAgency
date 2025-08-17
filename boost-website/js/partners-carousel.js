(() => {
  const root    = document.querySelector('.partners-carousel');
  if (!root) return;

  const track   = root.querySelector('.pc-track');
  const prevBtn = root.querySelector('.pc-prev');
  const nextBtn = root.querySelector('.pc-next');
  const dotsEl  = root.querySelector('.pc-dots');
  const slides  = Array.from(track.querySelectorAll('.partner-card'));
  if (!slides.length) return;

  const autoplayMs = 3500;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function slideWidth() {
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || 0);
    return slides[0].getBoundingClientRect().width + gap;
  }

  function currentIndex() {
    return Math.round(track.scrollLeft / slideWidth());
  }

  function scrollToIndex(i) {
    const maxIndex = slides.length - 1;
    const clamped = Math.max(0, Math.min(i, maxIndex));
    track.scrollTo({ left: clamped * slideWidth(), behavior: 'smooth' });
    updateDots(clamped);
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'pc-dot';
      b.type = 'button';
      b.setAttribute('aria-label', `Go to slide ${i+1}`);
      b.addEventListener('click', () => scrollToIndex(i));
      dotsEl.appendChild(b);
    });
    updateDots(0);
  }
  function updateDots(active) {
    dotsEl.querySelectorAll('.pc-dot').forEach((d, i) => {
      d.classList.toggle('active', i === active);
    });
  }

  prevBtn.addEventListener('click', () => scrollToIndex(currentIndex() - 1));
  nextBtn.addEventListener('click', () => scrollToIndex(currentIndex() + 1));

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollToIndex(currentIndex() + 1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToIndex(currentIndex() - 1); }
  });

  let syncTimer;
  track.addEventListener('scroll', () => {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => updateDots(currentIndex()), 80);
  });

  let autoId = null;
  function startAuto() {
    if (prefersReduced) return;
    if (autoId) return;
    autoId = setInterval(() => {
      const idx = currentIndex();
      const next = (idx + 1) % slides.length;
      scrollToIndex(next);
    }, autoplayMs);
  }
  function stopAuto() {
    clearInterval(autoId); autoId = null;
  }
  root.addEventListener('mouseenter', stopAuto);
  root.addEventListener('mouseleave', startAuto);
  root.addEventListener('focusin',  stopAuto);
  root.addEventListener('focusout', startAuto);
  window.addEventListener('blur',   stopAuto);
  window.addEventListener('focus',  startAuto);

  buildDots();
  updateDots(0);
  startAuto();

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => scrollToIndex(currentIndex()), 120);
  });
})();

