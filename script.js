(function () {
  'use strict';

  /* ---- Hero parallax ---- */
  const hero = document.querySelector('.hero');
  const heroShapes = document.querySelectorAll('.hero-shape');
  let heroBounds = null;

  function updateHeroParallax() {
    if (!hero) return;
    heroBounds = hero.getBoundingClientRect();
    const scrollProgress = 1 - (heroBounds.bottom / (heroBounds.height + window.innerHeight));
    const clamped = Math.max(0, Math.min(1, scrollProgress));

    heroShapes.forEach((shape, i) => {
      const speed = 0.15 * (i + 1);
      const y = clamped * 80 * speed;
      shape.style.transform = `translateY(${y}px)`;
    });
  }

  /* ---- General parallax layers ---- */
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  function updateParallaxLayers() {
    parallaxLayers.forEach(function (layer) {
      const speed = parseFloat(layer.dataset.speed) || 0.1;
      const rect = layer.parentElement.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (center - viewportCenter) * speed;
      layer.style.transform = `translateY(${offset}px)`;
    });
  }

  /* ---- Reveal animations (Intersection Observer) ---- */
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  /* ---- parallax shapes generation ---- */
  function createParallaxShapes() {
    const sections = document.querySelectorAll('.parallax-section');
    sections.forEach(function (section) {
      for (let i = 0; i < 3; i++) {
        const layer = document.createElement('div');
        layer.className = 'parallax-layer parallax-layer-circle';
        const size = 80 + Math.random() * 160;
        layer.style.width = size + 'px';
        layer.style.height = size + 'px';
        layer.style.left = Math.random() * 90 + '%';
        layer.style.top = Math.random() * 90 + '%';
        layer.dataset.speed = (0.05 + Math.random() * 0.15).toFixed(3);
        section.appendChild(layer);
      }
    });
  }

  /* ---- Scroll handler ---- */
  function onScroll() {
    requestAnimationFrame(function () {
      updateHeroParallax();
      updateParallaxLayers();
    });
  }

  /* ---- Init ---- */
  createParallaxShapes();
  updateParallaxLayers();
  updateHeroParallax();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    updateParallaxLayers();
    updateHeroParallax();
  });
})();
