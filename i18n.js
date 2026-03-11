// i18n.js — Translation module for dimaa.pages.dev
// Supports: en (English), ru (Russian), ja (Japanese)

const TRANSLATIONS = {
  en: {
    // Nav
    nav_home: "home",
    nav_projects: "projects",
    nav_pronouns: "pronouns & stuff",
    nav_bluesky: "bluesky",
    nav_discord: "discord",
    nav_youtube: "youtube",

    // Index
    index_title: "Dima's personal site",
    index_heading: "hey, im dima",
    index_subtitle: "(they/any)",
    index_card1_h2: "welcome to my corner",
    index_card1_p1: "i finally have my own site (even if it's on Cloudflare Pages). i like making weird things, playing geometry dash, and occasionally writing code that works.",
    index_card1_p2: "here you'll find my projects, pronouns, and links to where i hang out. everything is a work in progress – just like me.",
    index_card2_h2: "recent project",
    index_proj_title: "Roblox User Info API",
    index_proj_desc: "a single endpoint that combines multiple roblox apis to fetch user profiles, groups, avatar, presence, and more.",
    index_proj_docs: "documentation",
    index_btn_projects: "all projects",
    index_btn_pronouns: "pronouns & more",
    footer_index: "© 2026 Dima · translated and improved a bit by claude, thanks to anthropic",

    // Projects
    projects_title: "projects · Dima",
    projects_heading: "projects i work on",
    projects_subtitle: "(some are even finished)",
    projects_roblox_h2: "roblox games",
    proj_ruins_name: "Ruins",
    proj_ruins_desc: "basic asym game im working on,",
    proj_ruins_discord: "discord server",
    proj_evil_name: "Evil Game",
    proj_evil_desc: "another asym game thats upcoming",
    projects_tools_h2: "tools & apis",
    proj_rblx_desc: "combines multiple roblox endpoints into one. get user profiles, groups, avatar, presence, and more.",
    proj_rblx_github: "github repo",
    proj_rblx_docs: "docs",
    projects_btn_home: "home",
    projects_btn_pronouns: "pronouns & more",
    footer_projects: "© 2026 Dima – im dima and im cool! · translated and improved a bit by claude, thanks to anthropic",

    // Pronouns
    pronouns_title: "pronouns & gender · Dima",
    pronouns_heading: "pronouns and gender",
    pronouns_subtitle: "(important stuff)",
    pronouns_identity_h2: "identity",
    pronouns_gender_label: "gender:",
    pronouns_gender_val: "non‑binary",
    pronouns_pronouns_label: "pronouns:",
    pronouns_pronouns_val: "any pronouns - they/them, he/him, she/her, it/its, all welcome. just be respectful.",
    pronouns_orient_label: "orientation:",
    pronouns_orient_val: "aroace – not interested in romance/sex, but down for deep friendships.",
    pronouns_about_h2: "about me",
    pronouns_about_p: "i'm just a person who likes making things, playing geometry dash, and occasionally yelling at code. if you want to chat, feel free to reach out on discord (link above).",
    pronouns_btn_home: "home",
    pronouns_btn_projects: "projects",
    footer_pronouns: "© 2026 Dima – IM DIMA BRO IM DIMA IM DIMA!!!!!!!!! I SWEAR!!! · translated and improved a bit by claude, thanks to anthropic",

    // API Demo
    rblx_demo_h2: "try the api",
    rblx_demo_placeholder: "roblox username",
    rblx_demo_btn: "fetch",
    rblx_demo_loading: "fetching...",
    rblx_demo_err: "couldn't find that user.",
    rblx_demo_groups: "groups",
    rblx_demo_friends: "friends",
    rblx_demo_followers: "followers",
    // 404
    err_404: "404",
    err_404_msg: "you shouldn't be here",
    err_redirect: "⏳ redirecting you to something else...",
    err_redirect_link: "click here if nothing happens",
  },

  ru: {
    // Nav
    nav_home: "главная",
    nav_projects: "проекты",
    nav_pronouns: "местоимения и прочее",
    nav_bluesky: "Bluesky",
    nav_discord: "Discord",
    nav_youtube: "YouTube",

    // Index
    index_title: "Личный сайт Dima",
    index_heading: "привет, я Dima",
    index_subtitle: "(они/любые)",
    index_card1_h2: "добро пожаловать",
    index_card1_p1: "наконец-то у меня есть собственный сайт (пусть и на Cloudflare Pages). я люблю делать странные вещи, играть в Geometry Dash и иногда писать код, который работает.",
    index_card1_p2: "здесь вы найдёте мои проекты, местоимения и ссылки на то, где я обитаю. всё в процессе — как и я сам.",
    index_card2_h2: "последний проект",
    index_proj_title: "Roblox User Info API",
    index_proj_desc: "единый эндпоинт, объединяющий несколько Roblox API для получения профилей, групп, аватаров, статуса и многого другого.",
    index_proj_docs: "документация",
    index_btn_projects: "все проекты",
    index_btn_pronouns: "местоимения и прочее",
    footer_index: "© 2026 Dima · переведено и немного улучшено клауд, благодарности anthropic",

    // Projects
    projects_title: "проекты · Dima",
    projects_heading: "проекты, над которыми я работаю",
    projects_subtitle: "(некоторые даже завершены)",
    projects_roblox_h2: "игры в Roblox",
    proj_ruins_name: "Ruins",
    proj_ruins_desc: "асимметричная игра в разработке,",
    proj_ruins_discord: "сервер Discord",
    proj_evil_name: "Evil Game",
    proj_evil_desc: "ещё одна асимметричная игра, которая скоро выйдет",
    projects_tools_h2: "инструменты и API",
    proj_rblx_desc: "объединяет несколько эндпоинтов Roblox в один. получайте профили, группы, аватары, статус и многое другое.",
    proj_rblx_github: "репозиторий GitHub",
    proj_rblx_docs: "документация",
    projects_btn_home: "главная",
    projects_btn_pronouns: "местоимения и прочее",
    footer_projects: "© 2026 Dima – я Dima, и я крутой! · переведено и немного улучшено клауд, благодарности anthropic",

    // Pronouns
    pronouns_title: "местоимения и пол · Dima",
    pronouns_heading: "местоимения и пол",
    pronouns_subtitle: "(важное)",
    pronouns_identity_h2: "идентичность",
    pronouns_gender_label: "пол:",
    pronouns_gender_val: "небинарный",
    pronouns_pronouns_label: "местоимения:",
    pronouns_pronouns_val: "любые — они/их, он/его, она/её, оно/его — всё подходит. главное — уважение.",
    pronouns_orient_label: "ориентация:",
    pronouns_orient_val: "аро/эйс — романтические и сексуальные отношения не интересуют, но рад глубокой дружбе.",
    pronouns_about_h2: "обо мне",
    pronouns_about_p: "я просто человек, которому нравится делать вещи, играть в Geometry Dash и иногда кричать на код. если хотите поговорить — напишите мне в Discord (ссылка выше).",
    pronouns_btn_home: "главная",
    pronouns_btn_projects: "проекты",
    footer_pronouns: "© 2026 Dima – Я DIMA БРО Я DIMA Я DIMA!!!!!!!!! КЛЯНУСЬ!!! · переведено и немного улучшено клауд, благодарности anthropic",

    // API Demo
    rblx_demo_h2: "попробуй api",
    rblx_demo_placeholder: "имя пользователя Roblox",
    rblx_demo_btn: "запрос",
    rblx_demo_loading: "загрузка...",
    rblx_demo_err: "пользователь не найден.",
    rblx_demo_groups: "группы",
    rblx_demo_friends: "друзья",
    rblx_demo_followers: "подписчики",
    // 404
    err_404: "404",
    err_404_msg: "тебе здесь не место",
    err_redirect: "⏳ перенаправляем тебя куда надо...",
    err_redirect_link: "нажми сюда, если ничего не произошло",
  },

  ja: {
    // Nav
    nav_home: "ホーム",
    nav_projects: "プロジェクト",
    nav_pronouns: "代名詞など",
    nav_bluesky: "Bluesky",
    nav_discord: "Discord",
    nav_youtube: "YouTube",

    // Index
    index_title: "Dimaの個人サイト",
    index_heading: "こんにちは、Dimaです",
    index_subtitle: "(they/何でも)",
    index_card1_h2: "ようこそ",
    index_card1_p1: "ついに自分のサイトを持てました（Cloudflare Pagesだけど）。変なものを作ったり、Geometry Dashをしたり、たまに動くコードを書いたりするのが好きです。",
    index_card1_p2: "ここでは私のプロジェクト、代名詞、活動場所へのリンクを見つけられます。すべて進行中—私自身も同じく。",
    index_card2_h2: "最近のプロジェクト",
    index_proj_title: "Roblox User Info API",
    index_proj_desc: "複数のRoblox APIを1つのエンドポイントにまとめて、プロフィール、グループ、アバター、在線状況などを取得できます。",
    index_proj_docs: "ドキュメント",
    index_btn_projects: "全プロジェクト",
    index_btn_pronouns: "代名詞など",
    footer_index: "© 2026 Dima · claudeによる翻訳と少しの改善、anthropicに感謝",

    // Projects
    projects_title: "プロジェクト · Dima",
    projects_heading: "取り組んでいるプロジェクト",
    projects_subtitle: "（完成してるものもあります）",
    projects_roblox_h2: "Robloxゲーム",
    proj_ruins_name: "Ruins",
    proj_ruins_desc: "制作中の非対称ゲーム、",
    proj_ruins_discord: "Discordサーバー",
    proj_evil_name: "Evil Game",
    proj_evil_desc: "もうひとつの近日公開予定の非対称ゲーム",
    projects_tools_h2: "ツール & API",
    proj_rblx_desc: "複数のRobloxエンドポイントをひとつに。プロフィール、グループ、アバター、在線状況などを取得できます。",
    proj_rblx_github: "GitHubリポジトリ",
    proj_rblx_docs: "ドキュメント",
    projects_btn_home: "ホーム",
    projects_btn_pronouns: "代名詞など",
    footer_projects: "© 2026 Dima – DimaだよDimaすごい！· claudeによる翻訳と少しの改善、anthropicに感謝",

    // Pronouns
    pronouns_title: "代名詞とジェンダー · Dima",
    pronouns_heading: "代名詞とジェンダー",
    pronouns_subtitle: "（大切なこと）",
    pronouns_identity_h2: "アイデンティティ",
    pronouns_gender_label: "ジェンダー：",
    pronouns_gender_val: "ノンバイナリー",
    pronouns_pronouns_label: "代名詞：",
    pronouns_pronouns_val: "何でも可 — they/them、he/him、she/her、it/its、すべて歓迎。ただし敬意を持って。",
    pronouns_orient_label: "指向性：",
    pronouns_orient_val: "アロエイス — ロマンスや性的関係には興味なし。でも深い友情は大歓迎。",
    pronouns_about_h2: "自己紹介",
    pronouns_about_p: "ものを作ったり、Geometry Dashをしたり、たまにコードに叫んだりするのが好きな人です。話したければ、Discordでどうぞ（上のリンク）。",
    pronouns_btn_home: "ホーム",
    pronouns_btn_projects: "プロジェクト",
    footer_pronouns: "© 2026 Dima – DimaだよDimaだってDima！！！！！！！マジで！！！· claudeによる翻訳と少しの改善、anthropicに感謝",

    // API Demo
    rblx_demo_h2: "APIを試す",
    rblx_demo_placeholder: "Robloxユーザー名",
    rblx_demo_btn: "取得",
    rblx_demo_loading: "取得中...",
    rblx_demo_err: "ユーザーが見つかりません。",
    rblx_demo_groups: "グループ",
    rblx_demo_friends: "フレンド",
    rblx_demo_followers: "フォロワー",
    // 404
    err_404: "404",
    err_404_msg: "ここにいるべきじゃないよ",
    err_redirect: "⏳ 別のページに転送中...",
    err_redirect_link: "何も起きなければここをクリック",
  },
};

// Detect or get language
function getLang() {
  const params = new URLSearchParams(window.location.search);
  const paramLang = params.get("lang");
  if (paramLang && TRANSLATIONS[paramLang]) return paramLang;

  const stored = localStorage.getItem("preferred_lang");
  if (stored && TRANSLATIONS[stored]) return stored;

  // Browser language detection
  const browserLang = (navigator.language || navigator.userLanguage || "en").slice(0, 2).toLowerCase();
  if (TRANSLATIONS[browserLang]) return browserLang;

  return "en";
}

function setLang(lang) {
  localStorage.setItem("preferred_lang", lang);

  // Update URL param silently — no reload, no network round-trip
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url.toString());

  // Re-render translations in place
  applyTranslations();

  // Sync active state on switcher buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function t(key) {
  const lang = getLang();
  return TRANSLATIONS[lang][key] || TRANSLATIONS["en"][key] || key;
}

// Apply all [data-i18n] attributes on the page
function applyTranslations() {
  const lang = getLang();
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = TRANSLATIONS[lang][key] || TRANSLATIONS["en"][key];
    if (val !== undefined) el.textContent = val;
  });
  // Update <title>
  const titleKey = document.querySelector("meta[name='i18n-title']");
  if (titleKey) {
    const key = titleKey.getAttribute("content");
    const val = TRANSLATIONS[lang][key] || TRANSLATIONS["en"][key];
    if (val) document.title = val;
  }
}

// Build the language switcher UI
function buildLangSwitcher() {
  const lang = getLang();
  const labels = { en: "EN", ru: "РУС", ja: "日本語" };
  const switcher = document.createElement("div");
  switcher.className = "lang-switcher";
  Object.keys(labels).forEach((code) => {
    const btn = document.createElement("button");
    btn.textContent = labels[code];
    btn.className = "lang-btn" + (code === lang ? " active" : "");
    btn.dataset.lang = code;
    btn.setAttribute("aria-label", "Switch to " + code);
    btn.onclick = () => setLang(code);
    switcher.appendChild(btn);
  });
  return switcher;
}

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  const nav = document.querySelector(".top-nav");
  if (nav) {
    const divider = document.createElement("div");
    divider.className = "nav-divider";
    nav.prepend(divider);
    nav.prepend(buildLangSwitcher());
  }
});
