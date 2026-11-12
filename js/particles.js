/* =========================================================
   首屏粒子連線背景（神經網路感）
   - 光點緩慢漂移，距離近的會連線，滑鼠靠近時也會連過去
   - 手機自動減少數量；首屏捲出畫面或分頁在背景時暫停，省電
   - 不想要這個效果：把 index.html 裡載入這個檔案的那一行刪掉即可
   ========================================================= */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || !canvas.getContext) return;

  const hero = canvas.parentElement;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const LINK_DIST = 130;   // 光點之間多近會連線
  const MOUSE_DIST = 180;  // 滑鼠多近會連線
  const COLORS = ['#7474ff', '#22d3ee', '#d9b26a'];

  let width = 0;
  let height = 0;
  let points = [];
  let mouse = null;
  let visible = true;
  let frame = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = hero.clientWidth;
    height = hero.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 依面積決定數量：手機約 25–35 顆，桌機最多 80 顆
    const count = Math.max(22, Math.min(80, Math.round((width * height) / 14000)));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // 連線
    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const b = points[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK_DIST) {
          ctx.strokeStyle = 'rgba(140, 140, 255,' + (1 - d / LINK_DIST) * 0.28 + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      if (mouse) {
        const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (d < MOUSE_DIST) {
          ctx.strokeStyle = 'rgba(34, 211, 238,' + (1 - d / MOUSE_DIST) * 0.55 + ')';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // 光點
    for (const p of points) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function step() {
    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }
    draw();
    frame = requestAnimationFrame(step);
  }

  function start() {
    if (reduceMotion || frame !== null || !visible || document.hidden) return;
    frame = requestAnimationFrame(step);
  }

  function stop() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  }

  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  });
  hero.addEventListener('pointerleave', () => { mouse = null; });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }).observe(hero);
  }

  resize();
  start();
})();
