// rblx-demo.js — live Roblox User Info API demo widget

(function () {
  const API = 'https://rbx-group-fetcher.dimasuperotovorot3000.workers.dev/';

  function t(key) {
    // Piggyback on i18n.js if loaded, else fallback
    if (typeof TRANSLATIONS !== 'undefined' && typeof getLang === 'function') {
      const lang = getLang();
      return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) ||
             (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) || key;
    }
    return key;
  }

  function init() {
    const input  = document.getElementById('rblx-username');
    const btn    = document.getElementById('rblx-fetch-btn');
    const result = document.getElementById('rblx-result');
    if (!input || !btn || !result) return;

    // Sync placeholder via i18n
    function syncPlaceholder() {
      input.placeholder = t('rblx_demo_placeholder');
    }
    syncPlaceholder();
    // Re-sync when language changes (i18n calls applyTranslations which fires DOMContentLoaded after)
    document.addEventListener('i18n:applied', syncPlaceholder);

    async function doFetch() {
      const username = input.value.trim();
      if (!username) return;

      btn.disabled = true;
      btn.textContent = t('rblx_demo_loading');
      result.innerHTML = '';

      try {
        const res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            includeAvatar: true,
            includeFriendsCount: true,
            includeFollowersCount: true,
            includeGroups: true,
          }),
        });

        if (!res.ok) throw new Error('not found');
        const data = await res.json();
        if (data.error || !data.username) throw new Error('not found');

        render(result, data);
        generateQuip(data); // fire and forget — streams in after render
      } catch {
        result.innerHTML = `<p class="rblx-error">${t('rblx_demo_err')}</p>`;
      } finally {
        btn.disabled = false;
        btn.textContent = t('rblx_demo_btn');
      }
    }

    btn.addEventListener('click', doFetch);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doFetch(); });
  }

  function render(container, d) {
    const avatar = d.avatarUrl
      ? `<img class="rblx-avatar" src="${d.avatarUrl}" alt="${d.displayName}" loading="lazy" />`
      : '';

    const statsHtml = [
      d.friendsCount    != null ? `<span class="rblx-stat"><strong>${d.friendsCount}</strong> ${t('rblx_demo_friends')}</span>` : '',
      d.followersCount  != null ? `<span class="rblx-stat"><strong>${d.followersCount.toLocaleString()}</strong> ${t('rblx_demo_followers')}</span>` : '',
      d.groups          != null ? `<span class="rblx-stat"><strong>${d.groups.length}</strong> ${t('rblx_demo_groups')}</span>` : '',
    ].filter(Boolean).join('');

    const groupsHtml = d.groups && d.groups.length
      ? `<div class="rblx-groups">
          ${d.groups.slice(0, 6).map(g =>
            `<span class="rblx-group-tag">${g.groupName}</span>`
          ).join('')}
          ${d.groups.length > 6 ? `<span class="rblx-group-tag rblx-group-more">+${d.groups.length - 6}</span>` : ''}
        </div>`
      : '';

    const profileUrl = d.profileUrl || `https://www.roblox.com/users/${d.id}/profile`;

    container.innerHTML = `
      <div class="rblx-profile">
        ${avatar}
        <div class="rblx-profile-info">
          <a class="rblx-displayname" href="${profileUrl}" target="_blank" rel="noopener">${d.displayName}</a>
          <span class="rblx-username">@${d.username}</span>
          ${d.description ? `<p class="rblx-desc">${d.description}</p>` : ''}
          ${statsHtml ? `<div class="rblx-stats">${statsHtml}</div>` : ''}
        </div>
      </div>
      ${groupsHtml}
      <p class="rblx-ai-quip" id="rblx-quip">✦ <span class="rblx-quip-text"></span><span class="rblx-quip-cursor">▋</span></p>
    `;
  }

  const KNOWN_USERS = {
    papaleks11:    "PapaAleks11 is the site owner (Dima) — a non-binary developer who made this API",
    roblox:        "ROBLOX is the official Roblox platform account, owner of the Roblox platform",
    builderman:    "Builderman is the classic Roblox admin mascot account",
  };

  async function generateQuip(d) {
    const quipEl = document.getElementById('rblx-quip');
    if (!quipEl) return;

    const textEl  = quipEl.querySelector('.rblx-quip-text');
    const cursor  = quipEl.querySelector('.rblx-quip-cursor');

    const knownNote = KNOWN_USERS[d.username.toLowerCase()] || '';
    const groupSample = d.groups
      ? d.groups.slice(0, 8).map(g => g.groupName).join(', ')
      : 'none';
    const accountAge = d.created
      ? `${Math.floor((Date.now() - new Date(d.created)) / (1000*60*60*24*365))} years old`
      : 'unknown age';

    const prompt = `You are writing a tiny one-sentence observation about a Roblox user for a personal website footer. Be witty, warm, and concise — max 18 words. No quotes, no hashtags, no emoji, no "This user".
${knownNote ? `Context: ${knownNote}.` : ''}
User data:
- Username: ${d.username}
- Display name: ${d.displayName}
- Account age: ${accountAge}
- Friends: ${d.friendsCount ?? 'unknown'}
- Followers: ${d.followersCount ?? 'unknown'}
- Groups (sample): ${groupSample}
- Bio: ${d.description || 'none'}
Write only the observation, nothing else.`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 80,
          stream: true,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!res.ok) { quipEl.style.display = 'none'; return; }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        const lines = buf.split('\n');
        buf = lines.pop(); // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') break;
          try {
            const ev = JSON.parse(raw);
            if (ev.type === 'content_block_delta' && ev.delta?.text) {
              textEl.textContent += ev.delta.text;
            }
          } catch { /* skip malformed */ }
        }
      }

      cursor.style.display = 'none';
    } catch {
      quipEl.style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();