// functions/ai-quip.js — Cloudflare Pages Function
// Proxies quip generation through Gemini, keeps API key server-side

export async function onRequestPost(context) {
  const { env, request } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain; charset=utf-8',
  };

  try {
    const body = await request.json();
    const { username, displayName, accountAge, friendsCount, followersCount, groups, description } = body;

    const KNOWN_USERS = {
      papaleks11: 'PapaAleks11 is the site owner (Dima) — a non-binary developer who made this API and this site',
      roblox:     'ROBLOX is the official Roblox platform account, owner of the Roblox platform itself',
      builderman: 'Builderman is the classic Roblox admin mascot account',
    };

    const knownNote = KNOWN_USERS[(username || '').toLowerCase()] || '';
    const groupSample = (groups || []).slice(0, 8).map(g => g.groupName).join(', ') || 'none';

    const prompt = `You are writing a tiny one-sentence observation about a Roblox user for a personal website footer. Be witty, warm, and concise — max 18 words. No quotes, no hashtags, no emoji, no "This user".
${knownNote ? `Context: ${knownNote}.` : ''}
User data:
- Username: ${username}
- Display name: ${displayName}
- Account age: ${accountAge}
- Friends: ${friendsCount ?? 'unknown'}
- Followers: ${followersCount ?? 'unknown'}
- Groups (sample): ${groupSample}
- Bio: ${description || 'none'}
Write only the observation, nothing else.`;

    const geminiRes = await fetch(
      // apparently 2.0 flash isnt on the free tier so were going with 2.5
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-latest:generateContent?key=${env.gemini_api_key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 80, temperature: 1.0 },
        }),
      }
    );
    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(errText, { status: 502, headers: corsHeaders });
    }

    const geminiData = await geminiRes.json();
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    return new Response(text, { status: 200, headers: corsHeaders });
  } catch (e) {
    return new Response('', { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
