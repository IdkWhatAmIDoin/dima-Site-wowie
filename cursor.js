// cursor.js — GD cube cursor + dramatic time-based theme

(function () {

  // ── Time-based theme ─────────────────────────────────────────
  // Injects CSS variable overrides onto :root based on local hour
  // Periods: night 0-6, morning 6-12, afternoon 12-18, evening 18-24

  const TIME_THEMES = {
    night: {
      label: 'night',
      '--bg':        '#020408',
      '--surface':   'rgba(4, 8, 18, 0.85)',
      '--border':    'rgba(255, 255, 255, 0.04)',
      '--border-hi': 'rgba(255, 255, 255, 0.08)',
      '--accent':    '#2a7aff',
      '--accent2':   '#1a5fcc',
      '--text':      '#8899bb',
      '--text-dim':  '#445566',
      '--text-faint':'#222d40',
      '--project-bar':'#2a7aff',
      '--orb-hue':   '220',
      '--filter':    'brightness(0.7) saturate(0.6)',
    },
    morning: {
      label: 'morning',
      '--bg':        '#0d1520',
      '--surface':   'rgba(18, 28, 45, 0.8)',
      '--border':    'rgba(255, 255, 255, 0.09)',
      '--border-hi': 'rgba(255, 255, 255, 0.16)',
      '--accent':    '#f0a04a',
      '--accent2':   '#d4823a',
      '--text':      '#f0e6d0',
      '--text-dim':  '#9a8870',
      '--text-faint':'#4a3d2a',
      '--project-bar':'#f0a04a',
      '--orb-hue':   '35',
      '--filter':    'brightness(1.05) saturate(1.2)',
    },
    afternoon: {
      label: 'afternoon',
      '--bg':        '#080c14',
      '--surface':   'rgba(14, 20, 35, 0.75)',
      '--border':    'rgba(255, 255, 255, 0.07)',
      '--border-hi': 'rgba(255, 255, 255, 0.13)',
      '--accent':    '#5ecfbe',
      '--accent2':   '#3db89e',
      '--text':      '#dde5f4',
      '--text-dim':  '#7a90b0',
      '--text-faint':'#3d5070',
      '--project-bar':'#3db89e',
      '--orb-hue':   '185',
      '--filter':    'brightness(1) saturate(1)',
    },
    evening: {
      label: 'evening',
      '--bg':        '#0a0610',
      '--surface':   'rgba(16, 10, 28, 0.85)',
      '--border':    'rgba(255, 255, 255, 0.06)',
      '--border-hi': 'rgba(255, 255, 255, 0.11)',
      '--accent':    '#c084fc',
      '--accent2':   '#a855f7',
      '--text':      '#e8d5f5',
      '--text-dim':  '#8a70a0',
      '--text-faint':'#3d2855',
      '--project-bar':'#a855f7',
      '--orb-hue':   '270',
      '--filter':    'brightness(0.85) saturate(1.4)',
    },
  };

  function getPeriod(hour) {
    if (hour >= 0  && hour < 6)  return 'night';
    if (hour >= 6  && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'evening';
  }

  function applyTheme() {
    const hour   = new Date().getHours();
    const period = getPeriod(hour);
    const theme  = TIME_THEMES[period];
    const root   = document.documentElement;

    for (const [key, val] of Object.entries(theme)) {
      if (key === 'label' || key === '--orb-hue' || key === '--filter') continue;
      root.style.setProperty(key, val);
    }

    // Store orb hue so bg.js can pick it up if desired
    root.style.setProperty('--time-orb-hue', theme['--orb-hue']);
    root.style.setProperty('--time-period', `"${theme.label}"`);

    // Apply filter to body for dramatic shift
    const container = document.querySelector('.container');
    if (container) container.style.filter = theme['--filter'];

    // Show a tiny period badge in the corner
    let badge = document.getElementById('time-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'time-badge';
      Object.assign(badge.style, {
        position:   'fixed',
        bottom:     '1rem',
        right:      '1rem',
        fontSize:   '0.65rem',
        fontFamily: 'var(--font-body, sans-serif)',
        fontWeight: '600',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:      'var(--text-faint)',
        opacity:    '0.6',
        zIndex:     '998',
        pointerEvents: 'none',
        userSelect: 'none',
      });
      document.body.appendChild(badge);
    }
    const icons = { night: '🌙', morning: '🌅', afternoon: '☀️', evening: '🌆' };
    badge.textContent = `${icons[period]} ${period}`;
  }

  // Apply on load and re-check every minute
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
  } else {
    applyTheme();
  }
  setInterval(applyTheme, 60 * 1000);


  // ── GD Cube cursor ───────────────────────────────────────────

  // Hide native cursor globally
  const style = document.createElement('style');
  style.textContent = `* { cursor: none !important; }`;
  document.head.appendChild(style);

  // Build cursor element
  const cur = document.createElement('div');
  cur.id = 'gd-cursor';
  Object.assign(cur.style, {
    position:      'fixed',
    top:           '0',
    left:          '0',
    width:         '28px',
    height:        '28px',
    pointerEvents: 'none',
    zIndex:        '99999',
    transform:     'translate(-50%, -50%)',
    transition:    'transform 0.08s ease',
    willChange:    'transform, left, top',
  });

  // SVG GD cube (classic icon style)
  cur.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- outer body -->
      <rect x="2" y="2" width="24" height="24" rx="4" ry="4"
            fill="#1a1a2e" stroke="var(--accent, #5ecfbe)" stroke-width="1.5" filter="url(#glow)"/>
      <!-- inner detail diamond -->
      <polygon points="14,5 23,14 14,23 5,14"
               fill="none" stroke="var(--accent, #5ecfbe)" stroke-width="1" opacity="0.6"/>
      <!-- center dot -->
      <circle cx="14" cy="14" r="2.5" fill="var(--accent, #5ecfbe)" filter="url(#glow)"/>
      <!-- corner accents -->
      <rect x="3" y="3" width="4" height="4" rx="1" fill="var(--accent, #5ecfbe)" opacity="0.5"/>
      <rect x="21" y="3" width="4" height="4" rx="1" fill="var(--accent, #5ecfbe)" opacity="0.5"/>
      <rect x="3" y="21" width="4" height="4" rx="1" fill="var(--accent, #5ecfbe)" opacity="0.5"/>
      <rect x="21" y="21" width="4" height="4" rx="1" fill="var(--accent, #5ecfbe)" opacity="0.5"/>
    </svg>
  `;

  document.body.appendChild(cur);

  let mx = -100, my = -100;
  let angle = 0;
  let clicking = false;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  document.addEventListener('mousedown', () => { clicking = true; });
  document.addEventListener('mouseup',   () => { clicking = false; });

  // Animate: follow mouse + spin on click
  let lastTime = 0;
  function animateCursor(ts) {
    const dt = ts - lastTime;
    lastTime = ts;

    if (clicking) {
      angle += dt * 0.5; // spin fast while clicking
    } else {
      angle += dt * 0.04; // slow idle rotation
    }

    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
    cur.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${clicking ? 0.85 : 1})`;

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', () => {
    cur.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cur.style.opacity = '1';
  });

})();