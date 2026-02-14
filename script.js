const steps = [
  {
    label: "Step 1", title: "Opening Statement", time: "30s",
    rule: "年齢、性別、最重要既往（今回の問題に関連するもの）、主訴を1文で。聴衆が瞬時に臨床的イメージを構築できることが目標。",
    example: "「2型糖尿病の既往があり、喫煙歴を有する77歳男性。3日前からの湿性咳嗽と呼吸困難を主訴に来院されました。」",
    tips: ["既往歴として糖尿病がある場合、感染症への感受性やステロイド使用の難しさを示唆するため、Openingで提示すべきです。", "名前は不要。医学的なプロファイルのみ提示。"],
    key: "final_workbook_step_1"
  },
  {
    label: "Step 2", title: "現病歴 (HPI)", time: "2:30",
    rule: "受診までの経過を『相対時間（〜日前）』で語る。症状の性状(OPQRST)に加え、起坐呼吸などの重要な陰性所見を配置する。",
    example: "「3日前より湿性咳嗽が出現し、2日前より労作時呼吸困難を認めました。昨日より発熱、食思不振、体動困難となり受診。起坐呼吸、冷汗、下肢浮腫などは認めません。糖尿病の自己管理は良好でした。」",
    tips: ["食思不振・体動困難の提示は『重症度』の強力な証拠。", "心不全を否定するための陰性所見（起坐呼吸なし等）を必ず含める。"],
    key: "final_workbook_step_2"
  },
  {
    label: "Step 3", title: "既往歴・併存症", time: "30s",
    rule: "今回の鑑別に関連するものを優先。カルテには全て記載するが、プレゼンでは情報の取捨選択を行う。薬剤歴、アレルギーも含める。",
    example: "「既往に2型糖尿病（罹病期間10年）、高血圧があります。内服はメトホルミン、ダパグリフロジン、アムロジピン。薬剤アレルギーはありません。」",
    tips: ["メトホルミンとSGLT2阻害薬（ダパグリフロジン）は、急性期やステロイド使用時に中止・インスリン切り替えの検討が必要な重要薬剤です。"],
    key: "final_workbook_step_3"
  },
  {
    label: "Step 4", title: "生活歴 (Social History)", time: "30s",
    rule: "呼吸器疾患では特に重要。喫煙歴（Brinkman Index + 現喫煙状況）、職業、ペット、住環境など。",
    example: "「喫煙歴は1日20本×55年、現喫煙者。職歴は事務職。粉塵暴露歴や鳥類の飼育歴はありません。」",
    tips: ["COPDを疑う場合『現喫煙者であること』を明記するのが重要です。"],
    key: "final_workbook_step_4"
  },
  {
    label: "Step 5", title: "身体所見 (Objective)", time: "1:00",
    rule: "バイタルと全身状態から開始。鑑別に関係するシステム（呼吸器・循環器）を中心に。正常であることを期待する『陰性所見』も明言する。",
    example: "「BP 140/85, HR 95, BT 38.2, RR 24, SpO2 88%(RA)。軽度苦悶様。両肺野にwheezesを聴取。JVP怒張なし、下肢浮腫なし。」",
    tips: ["wheezesの存在を強調。", "心不全を否定する陰性所見（JVP・浮腫なし）をあえて明言し、肺病変への確信を示す。"],
    key: "final_workbook_step_5"
  },
  {
    label: "Step 6", title: "検査所見 (Labs/Imaging)", time: "1:00",
    rule: "異常値のみ。画像は『どこに何があるか』を言語化。D-dimer/BNP陰性など、臨床推論の鍵を出す。",
    example: "「X線で過膨張を認めますが浸潤影なし。CTで気腫性変化と気管支壁肥厚を認めます。PaO2低下、PaCO2 48mmHg。D-dimerおよびBNPは正常範囲内です。」",
    tips: ["BNP/D-dimerが正常であることは、アセスメントで心不全/PEを論理的に否定するための強力な証拠です。"],
    key: "final_workbook_step_6"
  },
  {
    label: "Step 7", title: "プロブレムリスト", time: "30s",
    rule: "確定していない診断名は書かず、症候名で記載。主訴に関連する項目を #1 に挙げる。",
    example: "「#1. wheezesを伴うII型急性呼吸不全、#2. 2型糖尿病、#3. 喫煙歴 です。」",
    tips: ["未診断の段階で #1 COPD急性増悪 と書かない。Tunnel Visionを避けるため。"],
    key: "final_workbook_step_7"
  },
  {
    label: "Step 8", title: "アセスメント", time: "2:00",
    rule: "Summary Statementから開始。最も可能性の高い診断の根拠、次いで鑑別（除外した理由）を論理的に語る。",
    example: "「喫煙歴、気腫性変化、wheezesから、背景にCOPDが存在し、感染による急性増悪（AE-COPD）を第一に考えます。心不全や肺塞栓症は否定的です。#2 についてはステロイド使用による高血糖増悪リスクを考慮します。」",
    tips: ["『〜と考えます』と断定的に述べる。", "併存症（糖尿病）への配慮を含めることで、臨床医としての視点の広さを示せます。"],
    key: "final_workbook_step_8"
  },
  {
    label: "Step 9", title: "プラン", time: "30s",
    rule: "診断・治療・教育プランを具体的に。特に糖尿病薬の具体的調整（中止薬・代替療法）を明記する。",
    example: "「SpO2 88-92%目標で酸素投与。ABC療法（抗菌薬・吸入・ステロイド）開始。#2 はメトホルミン・ダパグリフロジンを中止し、入院中はインスリン対応。改善後に禁煙指導を行います。」",
    tips: ["SGLT2阻害薬の中止はシックデイ予防に重要。", "禁煙やワクチン等の予防的介入を含めるのが岸本メソッド。"],
    key: "final_workbook_step_9"
  }
];

let currentIdx = 0;
let apiKey = localStorage.getItem('gemini_api_key') || "";

function init() {
  renderNavBar();
  updateContent();
  if (apiKey) document.getElementById('api-key-input').value = apiKey;
}

function renderNavBar() {
  const container = document.getElementById('step-nav-bar');
  container.innerHTML = '';
  steps.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = `w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${i === currentIdx ? 'active-step' : 'border-slate-200 bg-white text-slate-400'}`;
    btn.innerText = i + 1;
    btn.onclick = () => { currentIdx = i; updateContent(); };
    container.appendChild(btn);
  });
}

function updateContent() {
  const s = steps[currentIdx];
  document.getElementById('step-label').innerText = s.label;
  document.getElementById('step-time').innerText = s.time;
  document.getElementById('step-title').innerText = s.title;
  document.getElementById('step-rule').innerText = s.rule;
  document.getElementById('step-example').innerText = s.example;
  document.getElementById('step-tips').innerHTML = s.tips.map(t => `<div class="text-[11px] text-slate-600 flex items-start gap-2 leading-relaxed"><span class="text-blue-500">•</span>${t}</div>`).join('');

  const input = document.getElementById('draft-input');
  input.value = localStorage.getItem(s.key) || "";
  document.getElementById('char-count').innerText = `${input.value.length} CHARS`;

  renderNavBar();
  document.getElementById('btn-prev').disabled = currentIdx === 0;
  document.getElementById('btn-next').innerText = currentIdx === steps.length - 1 ? 'FINISH' : 'NEXT →';
}

function nextStep() { if (currentIdx < steps.length - 1) { currentIdx++; updateContent(); } }
function prevStep() { if (currentIdx > 0) { currentIdx--; updateContent(); } }

function saveDraft() {
  const val = document.getElementById('draft-input').value;
  localStorage.setItem(steps[currentIdx].key, val);
  document.getElementById('char-count').innerText = `${val.length} CHARS`;
  // Optional: show quick save indicator
}

function downloadFullDraft() {
  let fullText = "【症例プレゼンテーション原稿】\n";
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
  a.download = "Presentation_Draft.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function toggleSettings() { document.getElementById('settings-modal').classList.toggle('hidden'); }

function saveApiKey() {
  apiKey = document.getElementById('api-key-input').value.trim();
  localStorage.setItem('gemini_api_key', apiKey);
  showToast('APIキーを保存しました');
  toggleSettings();
}

function clearAllData() {
  if (confirm('全ての原稿データを消去しますか？\n（APIキーは保持されます）')) {
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
  output.classList.remove('hidden');
  document.getElementById('ai-loading').classList.remove('hidden');
  document.getElementById('ai-text').innerText = "";

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `以下の症例プレゼン原稿を添削してください。セクション：${steps[currentIdx].title}\n原稿：${draft}` }] }]
      })
    });
    const data = await response.json();
    document.getElementById('ai-loading').classList.add('hidden');
    if (data.error) {
      document.getElementById('ai-text').innerText = `エラー: ${data.error.message}`;
    } else {
      document.getElementById('ai-text').innerText = data.candidates[0].content.parts[0].text;
    }
  } catch (e) {
    document.getElementById('ai-loading').classList.add('hidden');
    document.getElementById('ai-text').innerText = "通信エラーが発生しました。";
  }
}

function closeAI() { document.getElementById('ai-output').classList.add('hidden'); }

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
