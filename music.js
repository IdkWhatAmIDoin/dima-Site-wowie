// music.js — background music player with floating volume/mute toggle

(function () {
  const audio = new Audio('./assets/sneaky_fuck.mp3');
  audio.loop   = true;
  audio.volume = 0.3;

  let started = false;
  /**
   * start thing
   * @returns {void}
   * sneaky fuckaroo
   */
  //DIMA
  function start() {
    if (started) return;
    started = true;
    audio.play().catch(() => {}); // silently fail if blocked
  }

  // start on first interaction
  document.addEventListener('click',     start, { once: true });
  document.addEventListener('keydown',   start, { once: true });
  document.addEventListener('touchstart',start, { once: true });

  // ── Floating player UI ───────────────────────────────────────
  const player = document.createElement('div');
  player.id = 'music-player';
  Object.assign(player.style, {
    position:      'fixed',
    bottom:        '1rem',
    left:          '1rem',
    zIndex:        '99998',
    display:       'flex',
    alignItems:    'center',
    gap:           '0.5rem',
    background:    'rgba(12, 18, 32, 0.85)',
    backdropFilter:'blur(12px)',
    border:        '1px solid rgba(255,255,255,0.1)',
    borderRadius:  '999px',
    padding:       '0.4rem 0.75rem',
    fontFamily:    'var(--font-body, sans-serif)',
    fontSize:      '0.7rem',
    color:         'var(--text-faint, #3d5070)',
    userSelect:    'none',
    transition:    'border-color 0.2s',
  });

  // mute button
  const muteBtn = document.createElement('button');
  Object.assign(muteBtn.style, {
    background:  'none',
    border:      'none',
    cursor:      'pointer',
    padding:     '0',
    fontSize:    '0.9rem',
    lineHeight:  '1',
    color:       'var(--accent, #5ecfbe)',
  });
  muteBtn.textContent = '🔊';
  muteBtn.title = 'mute/unmute';

  // label
  const label = document.createElement('span');
  label.textContent = 'sneaky snitch';
  Object.assign(label.style, {
    color:         'var(--text-faint, #3d5070)',
    letterSpacing: '0.05em',
    whiteSpace:    'nowrap',
  });

  // volume slider
  const slider = document.createElement('input');
  slider.type  = 'range';
  slider.min   = '0';
  slider.max   = '100';
  slider.value = '30';
  Object.assign(slider.style, {
    width:      '60px',
    accentColor:'var(--accent, #5ecfbe)',
    cursor:     'pointer',
  });

  player.appendChild(muteBtn);
  player.appendChild(label);
  player.appendChild(slider);
  document.body.appendChild(player);

  // ── Controls ─────────────────────────────────────────────────
  let muted = false;

  muteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // don't trigger start() again
    muted = !muted;
    audio.muted      = muted;
    muteBtn.textContent = muted ? '🔇' : '🔊';
    if (!started) start();
  });

  slider.addEventListener('input', () => {
    audio.volume = slider.value / 100;
    if (audio.volume === 0) {
      muted = true;
      audio.muted = true;
      muteBtn.textContent = '🔇';
    } else if (muted) {
      muted = false;
      audio.muted = false;
      muteBtn.textContent = '🔊';
    }
    if (!started) start();
  });

  // stop slider clicks from triggering jump sound
  slider.addEventListener('mousedown', (e) => e.stopPropagation());

})();