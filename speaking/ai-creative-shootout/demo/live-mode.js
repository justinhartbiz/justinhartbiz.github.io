/**
 * Live Mode — AI Creative Shootout
 * Handles API key management, streaming calls to OpenAI/Gemini/Anthropic
 */

const LiveMode = (() => {
  let enabled = false;
  
  const SYSTEM_PROMPTS = {
    patriot: `You are "The Patriot" — a fundraising copy critic who values dignity, honor, aspiration, and American greatness. You believe positive emotion converts better than fear. You reference JFK, Reagan, and "morning in America" energy. You want donors to feel PROUD, not scared. You're passionate, eloquent, and a little dramatic.`,
    skeptic: `You are "The Skeptic" — a ruthless, data-driven fundraising copy critic. You demand proof, specifics, citations, and clarity. You hate vague claims, buzzwords, and emotional manipulation without substance. You cite conversion stats and A/B test results. You're dry, precise, and occasionally sarcastic.`,
    urgency: `You are "The Urgency" — a high-energy fundraising expert OBSESSED with deadlines, match offers, countdown timers, and CAPS LOCK. You believe NOTHING converts without urgency mechanics. You want 3X matches, midnight deadlines, and consequences for inaction. You TYPE IN CAPS when excited (which is always). You use 🔥 liberally.`
  };

  const ROUND_PROMPTS = [
    (draft) => `A user submitted this fundraising draft for critique:\n\n"${draft}"\n\nGive your initial reaction and critique. Be in-character, opinionated, 2-3 sentences.`,
    (draft, history) => `The fundraising draft was: "${draft}"\n\nHere's what the other critics said:\n${history}\n\nNow respond — react to the others' points, build on them, push your perspective. Stay in character. 2-3 sentences.`,
    (draft, history) => `The fundraising draft was: "${draft}"\n\nHere's the full discussion so far:\n${history}\n\nNow start converging toward a solution. Propose specific language or structure. Agree where you can. Stay in character. 2-3 sentences.`,
    (draft, history) => `The fundraising draft was: "${draft}"\n\nHere's the full discussion:\n${history}\n\nThis is the FINAL round. Give your approval (start with ✅) and one closing remark. 1-2 sentences. Stay in character.`
  ];

  const CONSENSUS_PROMPT = (draft, history) => `You are a master copywriter. Based on this critique session about the draft "${draft}":\n\n${history}\n\nWrite the FINAL fundraising email incorporating all the critics' best ideas. Include:\n- Subject line\n- Body copy\n- A P.S. line\n\nFormat it cleanly. No meta-commentary, just the final copy.`;

  function getKeys() {
    return {
      openai: localStorage.getItem('shootout_openai_key') || '',
      anthropic: localStorage.getItem('shootout_anthropic_key') || '',
      gemini: localStorage.getItem('shootout_gemini_key') || ''
    };
  }

  function saveKeys(keys) {
    if (keys.openai) localStorage.setItem('shootout_openai_key', keys.openai);
    else localStorage.removeItem('shootout_openai_key');
    if (keys.anthropic) localStorage.setItem('shootout_anthropic_key', keys.anthropic);
    else localStorage.removeItem('shootout_anthropic_key');
    if (keys.gemini) localStorage.setItem('shootout_gemini_key', keys.gemini);
    else localStorage.removeItem('shootout_gemini_key');
  }

  function hasAnyKey() {
    const k = getKeys();
    return !!(k.openai || k.anthropic || k.gemini);
  }

  // Pick which API to use for each character
  function getApiForCharacter(char) {
    const k = getKeys();
    // Preferred mapping: Patriot→OpenAI, Skeptic→Anthropic, Urgency→Gemini
    // Falls back to whatever key is available
    const prefs = {
      patriot: ['openai', 'gemini', 'anthropic'],
      skeptic: ['anthropic', 'gemini', 'openai'],
      urgency: ['gemini', 'openai', 'anthropic']
    };
    for (const api of prefs[char]) {
      if (k[api]) return api;
    }
    return null;
  }

  // Stream from OpenAI
  async function* streamOpenAI(systemPrompt, userPrompt, messages) {
    const key = getKeys().openai;
    const body = {
      model: 'gpt-4o-mini',
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
        { role: 'user', content: userPrompt }
      ]
    };
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') return;
        try {
          const j = JSON.parse(data);
          const c = j.choices?.[0]?.delta?.content;
          if (c) yield c;
        } catch {}
      }
    }
  }

  // Stream from Gemini
  async function* streamGemini(systemPrompt, userPrompt, messages) {
    const key = getKeys().gemini;
    const contents = [];
    // Convert messages to Gemini format
    for (const m of messages) {
      contents.push({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] });
    }
    contents.push({ role: 'user', parts: [{ text: userPrompt }] });

    const body = {
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: { temperature: 0.9, maxOutputTokens: 500 }
    };
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${key}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        try {
          const j = JSON.parse(line.slice(6));
          const text = j.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) yield text;
        } catch {}
      }
    }
  }

  // Stream from Anthropic (may fail CORS from browser)
  async function* streamAnthropic(systemPrompt, userPrompt, messages) {
    const key = getKeys().anthropic;
    const msgs = [...messages, { role: 'user', content: userPrompt }];
    // Ensure alternating roles
    const cleaned = [];
    for (const m of msgs) {
      if (cleaned.length > 0 && cleaned[cleaned.length - 1].role === m.role) {
        cleaned[cleaned.length - 1].content += '\n\n' + m.content;
      } else {
        cleaned.push({ ...m });
      }
    }
    const body = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      stream: true,
      system: systemPrompt,
      messages: cleaned
    };
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        try {
          const j = JSON.parse(line.slice(6));
          if (j.type === 'content_block_delta' && j.delta?.text) yield j.delta.text;
        } catch {}
      }
    }
  }

  // Main stream function — picks the right API
  async function* streamCharacter(character, systemPrompt, userPrompt, conversationHistory) {
    const api = getApiForCharacter(character);
    if (!api) throw new Error('No API key configured for ' + character);
    const streamFn = { openai: streamOpenAI, gemini: streamGemini, anthropic: streamAnthropic }[api];
    yield* streamFn(systemPrompt, userPrompt, conversationHistory || []);
  }

  // Toast notification
  function toast(msg) {
    let el = document.getElementById('live-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'live-toast';
      el.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#ff453a;color:#fff;padding:12px 24px;border-radius:12px;font-size:.9em;font-weight:600;z-index:9999;transition:opacity .3s;pointer-events:none;';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = '1';
    setTimeout(() => el.style.opacity = '0', 3500);
  }

  // API Keys Modal
  function showKeysModal() {
    let modal = document.getElementById('keys-modal');
    if (modal) { modal.style.display = 'flex'; return; }
    const keys = getKeys();
    modal = document.createElement('div');
    modal.id = 'keys-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;z-index:10000;';
    modal.innerHTML = `
      <div style="background:#1c1c2e;border:1px solid #333;border-radius:16px;padding:28px;max-width:420px;width:90%;color:#e0e0e0;font-family:Inter,sans-serif;">
        <h3 style="margin:0 0 6px;font-size:1.1em;">🔑 API Keys for Live Mode</h3>
        <p style="color:#888;font-size:.8em;margin-bottom:16px;">Keys are stored in localStorage (never sent to us). You need at least one.</p>
        <label style="font-size:.8em;font-weight:600;color:#00e5ff;">OpenAI API Key</label>
        <input id="key-openai" type="password" value="${keys.openai}" placeholder="sk-..." style="width:100%;padding:10px;border-radius:8px;border:1px solid #333;background:#0a0a0f;color:#fff;font-family:monospace;font-size:.85em;margin:4px 0 12px;">
        <label style="font-size:.8em;font-weight:600;color:#ff00e5;">Anthropic API Key</label>
        <input id="key-anthropic" type="password" value="${keys.anthropic}" placeholder="sk-ant-..." style="width:100%;padding:10px;border-radius:8px;border:1px solid #333;background:#0a0a0f;color:#fff;font-family:monospace;font-size:.85em;margin:4px 0 12px;">
        <label style="font-size:.8em;font-weight:600;color:#ffe500;">Gemini API Key</label>
        <input id="key-gemini" type="password" value="${keys.gemini}" placeholder="AI..." style="width:100%;padding:10px;border-radius:8px;border:1px solid #333;background:#0a0a0f;color:#fff;font-family:monospace;font-size:.85em;margin:4px 0 12px;">
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button id="keys-save" style="flex:1;padding:10px;border:none;border-radius:8px;background:linear-gradient(135deg,#00e5ff,#ff00e5);color:#000;font-weight:700;cursor:pointer;">Save Keys</button>
          <button id="keys-cancel" style="padding:10px 20px;border:1px solid #555;border-radius:8px;background:transparent;color:#888;cursor:pointer;">Cancel</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    document.getElementById('keys-save').onclick = () => {
      saveKeys({
        openai: document.getElementById('key-openai').value.trim(),
        anthropic: document.getElementById('key-anthropic').value.trim(),
        gemini: document.getElementById('key-gemini').value.trim()
      });
      modal.style.display = 'none';
      if (!hasAnyKey()) { enabled = false; updateToggleUI(); }
      toast('Keys saved ✓');
    };
    document.getElementById('keys-cancel').onclick = () => {
      modal.style.display = 'none';
      if (!hasAnyKey()) { enabled = false; updateToggleUI(); }
    };
    modal.onclick = (e) => { if (e.target === modal) document.getElementById('keys-cancel').click(); };
  }

  let toggleEl = null;
  function updateToggleUI() {
    if (!toggleEl) return;
    toggleEl.innerHTML = enabled ? '🔴 Live' : '⚪ Simulated';
    toggleEl.style.borderColor = enabled ? '#ff453a' : '#555';
    toggleEl.style.color = enabled ? '#ff453a' : '#888';
  }

  function createToggle() {
    toggleEl = document.createElement('div');
    toggleEl.style.cssText = 'position:fixed;top:12px;left:16px;background:#14141f;border:2px solid #555;border-radius:20px;padding:6px 16px;font-size:.85em;cursor:pointer;z-index:100;user-select:none;font-family:Inter,sans-serif;display:flex;align-items:center;gap:8px;transition:all .2s;';
    toggleEl.onclick = () => {
      if (!enabled && !hasAnyKey()) {
        showKeysModal();
        return;
      }
      enabled = !enabled;
      updateToggleUI();
    };
    // Add gear icon for key settings
    const gear = document.createElement('span');
    gear.textContent = '⚙️';
    gear.style.cssText = 'font-size:.9em;cursor:pointer;';
    gear.onclick = (e) => { e.stopPropagation(); showKeysModal(); };
    
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:fixed;top:12px;left:16px;display:flex;gap:6px;align-items:center;z-index:100;';
    wrapper.appendChild(toggleEl);
    wrapper.appendChild(gear);
    
    document.body.appendChild(wrapper);
    updateToggleUI();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createToggle);
  } else {
    createToggle();
  }

  return {
    get enabled() { return enabled; },
    SYSTEM_PROMPTS,
    ROUND_PROMPTS,
    CONSENSUS_PROMPT,
    streamCharacter,
    toast,
    getKeys,
    hasAnyKey,
    showKeysModal
  };
})();
