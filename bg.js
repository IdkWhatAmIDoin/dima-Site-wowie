// bg.js — interactive background ripples on click + scroll progress bar

(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    zIndex: '-1',
    pointerEvents: 'none',
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Scroll progress bar ──────────────────────────────────────
  function updateScrollProgress() {
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    document.body.style.setProperty('--scroll-pct', pct.toFixed(2));
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ── Ripple pool ──────────────────────────────────────────────
  const ripples = [];

  // Hues for the ripple colors — warm teal/cyan/mint palette
  const HUES = [170, 185, 155, 195, 160];

  function spawnRipple(x, y) {
    const hue = HUES[Math.floor(Math.random() * HUES.length)];
    ripples.push({
      x, y,
      r: 0,
      maxR: 180 + Math.random() * 120,
      alpha: 0.55,
      hue,
      speed: 2.8 + Math.random() * 1.8,
    });
  }

  document.addEventListener('click', (e) => {
    spawnRipple(e.clientX, e.clientY);
  });

  // Touch support
  document.addEventListener('touchstart', (e) => {
    for (const t of e.touches) spawnRipple(t.clientX, t.clientY);
  }, { passive: true });

  // ── Ambient drifting orbs ────────────────────────────────────
  const orbs = Array.from({ length: 3 }, (_, i) => ({
    x: W * (0.15 + i * 0.35),
    y: H * (0.2 + (i % 2) * 0.5),
    r: 280 + i * 80,
    hue: [185, 165, 200][i],
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.18,
    alpha: 0.07 + i * 0.02,
  }));

  // ── Main loop ────────────────────────────────────────────────
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Ambient orbs
    for (const o of orbs) {
      o.x += o.vx;
      o.y += o.vy;
      if (o.x < -o.r || o.x > W + o.r) o.vx *= -1;
      if (o.y < -o.r || o.y > H + o.r) o.vy *= -1;

      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0,   `hsla(${o.hue}, 70%, 55%, ${o.alpha})`);
      g.addColorStop(1,   `hsla(${o.hue}, 70%, 55%, 0)`);
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    // Click ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r     += rp.speed;
      rp.alpha *= 0.965;

      if (rp.alpha < 0.005 || rp.r > rp.maxR) {
        ripples.splice(i, 1);
        continue;
      }

      const g = ctx.createRadialGradient(rp.x, rp.y, rp.r * 0.6, rp.x, rp.y, rp.r);
      g.addColorStop(0, `hsla(${rp.hue}, 80%, 65%, 0)`);
      g.addColorStop(0.7, `hsla(${rp.hue}, 80%, 65%, ${rp.alpha * 0.4})`);
      g.addColorStop(1,   `hsla(${rp.hue}, 80%, 65%, 0)`);

      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Ring stroke
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${rp.hue}, 85%, 70%, ${rp.alpha * 0.6})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
