(() => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    const cards = document.querySelectorAll(".result-card");
    if (!cards.length) return;

    // Si quieres forzar animación aunque el sistema tenga reduce-motion,
    // pon data-force-anim="true" en el <section class="results-stats">.
    const forceAnim = document.querySelector(".results-stats")?.dataset.forceAnim === "true";
    const prefersReduced = !forceAnim && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && animateCard(e.target, prefersReduced));
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

    cards.forEach((c) => {
      io.observe(c);
      if (isInViewport(c)) animateCard(c, prefersReduced);
    });
  }

  function isInViewport(el) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.9 && r.bottom > 0;
  }

  function animateCard(card, prefersReduced) {
    if (card.dataset.animated === "true") return;
    card.dataset.animated = "true";

    const target = Number(card.dataset.target);           // 200, 12, 50
    const max    = Number(card.dataset.max) || target;    // para % de barra
    const suffix = card.dataset.suffix || "";             // "%", "×", "K+", "+"

    const valueEl = card.querySelector(".result-value");
    const bar     = card.querySelector(".bar");
    if (!valueEl) return; // sin número no hay animación

    // ---- Barra con animación garantizada ----
    const progress = Math.min((target / max) * 100, 100);
    if (bar) {
      bar.style.transition = "none";
      bar.style.width = "0%";
      void bar.offsetWidth; // reflow
      bar.style.transition = "width 1200ms ease";
      requestAnimationFrame(() => { bar.style.width = progress + "%"; });

      const pr = card.querySelector(".progress");
      if (pr) pr.setAttribute("aria-valuenow", String(target));
    }

    // ---- Números ----
    if (prefersReduced) {
      valueEl.textContent = formatValue(target, suffix);
      return;
    }

    // rAF + fallback a setInterval por si rAF no corre
    const duration = 1400;
    const start = performance.now();
    let usedInterval = false;

    valueEl.textContent = formatValue(0, suffix);

    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = target * eased;
      valueEl.textContent = formatValue(current, suffix);
      if (t < 1) requestAnimationFrame(step);
    }

    const rafId = requestAnimationFrame(step);

    // Fallback si en 80ms el valor sigue en 0
    setTimeout(() => {
      if (valueEl.textContent === formatValue(0, suffix)) {
        // rAF no produjo cambio; usa setInterval
        usedInterval = true;
        let startTs = Date.now();
        const intId = setInterval(() => {
          const t = Math.min((Date.now() - startTs) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = target * eased;
          valueEl.textContent = formatValue(current, suffix);
          if (t >= 1) clearInterval(intId);
        }, 16);
      }
    }, 80);
  }

  function formatValue(value, suffix) {
    const v = Number(value);
    if (suffix === "K+") return `${Math.round(v)}K+`;
    if (suffix === "×")  return (v < 10 ? v.toFixed(1) : Math.round(v)) + "×";
    if (suffix === "%")  return Math.round(v) + "%";
    if (suffix.startsWith("+")) return "+" + Math.round(v);
    return Math.round(v) + (suffix || "");
  }
})();
