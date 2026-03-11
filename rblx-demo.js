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
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
