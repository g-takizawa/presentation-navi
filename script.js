// script.js - Shared Logic
// Expects 'steps' array to be defined in the HTML file before loading this script.

let currentIdx = 0;
let apiKey = localStorage.getItem('gemini_api_key') || "";

function init() {
  if (typeof steps === 'undefined') {
    console.error("Steps data not defined.");
    return;
  }
  renderNavBar();
  updateContent();
  if (apiKey) {
    const keyInput = document.getElementById('api-key-input');
    if (keyInput) keyInput.value = apiKey;
  }
}

function renderNavBar() {
  const container = document.getElementById('step-nav-bar');
  if (!container) return;
  container.innerHTML = '';
  steps.forEach((s, i) => {
    const btn = document.createElement('button');
    // Use generic styling or strict utility classes.
    // Note: Active color depends on theme (Indigo vs Blue). handled via specific classes in HTML or generic logic.
    // For simplicity, we check if the body has a specific theme class or just use a default 'active-step' class defined in CSS/HTML.
    const activeClass = 'active-step'; // Defined in CSS
    const inactiveClass = 'border-slate-200 bg-white text-slate-400';

    btn.className = `w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${i === currentIdx ? activeClass : inactiveClass}`;
    btn.innerText = i + 1;
    btn.onclick = () => { currentIdx = i; updateContent(); };
    container.appendChild(btn);
  });
}

function updateContent() {
  const s = steps[currentIdx];

  // safe update helper
  const setText = (id, text) => { const el = document.getElementById(id); if (el) el.innerText = text; };
  const setHTML = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

  setText('step-label', s.label);
  setText('step-time', s.time);
  setText('step-title', s.title);
  setText('step-rule', s.rule);
  setText('step-example', s.example);

  // Tips
  if (document.getElementById('step-tips')) {
    const bulletColor = document.body.classList.contains('theme-indigo') ? 'text-indigo-500' : 'text-blue-500';
    setHTML('step-tips', s.tips.map(t => `<div class="text-[11px] text-slate-600 flex items-start gap-2 leading-relaxed"><span class="${bulletColor}">•</span>${t}</div>`).join(''));
  }

  // Input
  const input = document.getElementById('draft-input');
  if (input) {
    input.value = localStorage.getItem(s.key) || "";
    setText('char-count', `${input.value.length} CHARS`);
  }

  renderNavBar();

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  if (btnPrev) btnPrev.disabled = currentIdx === 0;
  if (btnNext) btnNext.innerText = currentIdx === steps.length - 1 ? 'FINISH' : 'NEXT →';
}

function nextStep() { if (currentIdx < steps.length - 1) { currentIdx++; updateContent(); } }
function prevStep() { if (currentIdx > 0) { currentIdx--; updateContent(); } }

function saveDraft() {
  const input = document.getElementById('draft-input');
  if (!input) return;
  localStorage.setItem(steps[currentIdx].key, input.value);
  document.getElementById('char-count').innerText = `${input.value.length} CHARS`;
}

function downloadFullDraft() {
  let title = document.title || "Presentation_Draft";
  let fullText = `【${title}】\n`;
  fullText += "--------------------------------------------------\n\n";

  steps.forEach(s => {
    const draft = localStorage.getItem(s.key) || "(未入力)";
    fullText += `■ ${s.label}: ${s.title}\n`;
    fullText += `${draft}\n\n`;
  });

  fullText += "--------------------------------------------------\n";
  fullText += `作成日: ${new Date().toLocaleDateString()}\n`;

  const blob = new Blob([fullText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function toggleSettings() {
  const modal = document.getElementById('settings-modal');
  if (modal) modal.classList.toggle('hidden');
}

function saveApiKey() {
  const input = document.getElementById('api-key-input');
  if (input) {
    apiKey = input.value.trim();
    localStorage.setItem('gemini_api_key', apiKey);
    showToast('APIキーを保存しました');
    toggleSettings();
  }
}

function clearAllData() {
  if (confirm('全ての原稿データを消去しますか？\n（APIキーは保持されます）')) {
    // Clear all keys defined in current steps
    steps.forEach(s => localStorage.removeItem(s.key));
    updateContent();
    showToast('データを消去しました');
    toggleSettings();
  }
}

async function aiCritique() {
  if (!apiKey) { toggleSettings(); return; }
  const draft = document.getElementById('draft-input').value;
  if (!draft) { showToast('原稿が入力されていません'); return; }

  const output = document.getElementById('ai-output');
  if (output) output.classList.remove('hidden');

  const loader = document.getElementById('ai-loading');
  if (loader) loader.classList.remove('hidden');

  const textEl = document.getElementById('ai-text');
  if (textEl) textEl.innerText = "";

  try {
    const systemInstruction = window.aiSystemPrompt || "あなたは親切な指導医です。";

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ parts: [{ text: `以下の医学プレゼン原稿を添削してください。\nセクション：${steps[currentIdx].title}\n\n原稿：${draft}` }] }]
      })
    });
    const data = await response.json();
    if (loader) loader.classList.add('hidden');

    if (data.error) {
      if (textEl) textEl.innerText = `エラー: ${data.error.message}`;
    } else {
      if (textEl) textEl.innerText = data.candidates[0].content.parts[0].text;
    }
  } catch (e) {
    if (loader) loader.classList.add('hidden');
    if (textEl) textEl.innerText = "通信エラーが発生しました。";
  }
}

function closeAI() {
  const output = document.getElementById('ai-output');
  if (output) output.classList.add('hidden');
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast show';
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

window.onload = init;
