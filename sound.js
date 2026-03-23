// sound.js — GD-style sound effects via Web Audio API (no external files)

(function () {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  // ── Core synth helpers ───────────────────────────────────────

  function playTone({ freq = 440, type = 'square', gain = 0.15, duration = 0.08, freqEnd = null, detune = 0 }) {
    const ac  = getCtx();
    const osc = ac.createOscillator();
    const amp = ac.createGain();

    osc.connect(amp);
    amp.connect(ac.destination);

    osc.type    = type;
    osc.detune.value = detune;
    osc.frequency.setValueAtTime(freq, ac.currentTime);
    if (freqEnd !== null) {
      osc.frequency.exponentialRampToValueAtTime(freqEnd, ac.currentTime + duration);
    }

    amp.gain.setValueAtTime(gain, ac.currentTime);
    amp.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);

    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration + 0.01);
  }

  // ── GD-style sounds ──────────────────────────────────────────

  // Jump — classic GD boing: quick pitch sweep up
  function playJump() {
    playTone({ freq: 300, freqEnd: 600, type: 'square', gain: 0.12, duration: 0.12 });
    playTone({ freq: 600, freqEnd: 900, type: 'sine',   gain: 0.06, duration: 0.1, detune: 5 });
  }

  // Click — satisfying short blip
  function playClick() {
    playTone({ freq: 800, freqEnd: 400, type: 'square', gain: 0.1, duration: 0.07 });
    playTone({ freq: 1200, freqEnd: 600, type: 'sine',  gain: 0.05, duration: 0.05 });
  }

  // Hover — tiny soft tick
  function playHover() {
    playTone({ freq: 1000, freqEnd: 1200, type: 'sine', gain: 0.04, duration: 0.04 });
  }

  // ── Event listeners ──────────────────────────────────────────

  // Cursor click (mousedown anywhere)
  document.addEventListener('mousedown', () => {
    playJump();
  });

  // Button/link clicks
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, .button, .lang-btn');
    if (target) playClick();
  });

  // Hover on interactive elements
  const hoverTargets = 'a, button, .button, .lang-btn, .project-item, .card';
  let lastHovered = null;

    document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverTargets);
    if (!target) return;
    // only fire if we're entering from outside the target so that it doesnt gihfdiogfhgihhfhf
    const from = e.relatedTarget?.closest(hoverTargets);
    if (target !== lastHovered && from !== target) {
        lastHovered = target;
        playHover();
    }
    });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverTargets);
    if (target === lastHovered) lastHovered = null;
  });

})();