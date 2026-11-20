/* =========================================================
   智享有限公司 — 網站互動
   1. 手機選單開合
   2. 對話式需求診斷（純前端，問答內容都寫在下方，可自行修改）
   ========================================================= */

// ---------- 1. 手機選單 ----------
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function closeMenu() {
  navMenu.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

document.getElementById('year').textContent = new Date().getFullYear();

// ---------- 2. 需求診斷：問答內容 ----------
// 想改題目或建議，直接改這裡的文字即可。

const ROLES = [
  { id: 'biz', label: '企業主／主管' },
  { id: 'solo', label: '上班族／自由工作者／學生' },
  { id: 'newbie', label: '我是 AI 新手，只是好奇' },
];

// 每種身分的「困擾」選項，以及對應的建議
const PAINS = {
  biz: {
    question: '了解！那公司目前最想改善的是哪一件事？',
    options: [
      {
        label: '重複的行政與報表太花時間',
        title: '從「一份固定報表」開始自動化',
        why: '重複、規則明確的工作最適合交給 AI，也最容易看到省下的時間。',
        steps: ['列出每週固定要做的 3 份文件或報表', '挑出格式最固定的一份，請 AI 產出初稿', '由同事檢查修正，記錄每次省下多少時間'],
      },
      {
        label: '客服或詢問訊息回不完',
        title: '先建立「常見問題回覆助手」',
        why: '大部分客戶詢問會集中在少數幾類問題，整理好就能大幅加快回覆。',
        steps: ['收集最近最常被問的 20 個問題與標準答案', '用 AI 依這份資料草擬回覆，由人確認後送出', '每月補充新問題，逐步擴大可處理範圍'],
      },
      {
        label: '行銷內容產出不夠快',
        title: '建立「內容產出流程」而不是單篇生成',
        why: '把品牌語氣和固定格式先定好，AI 產出的內容才會穩定可用。',
        steps: ['整理 3–5 篇你滿意的過往內容當範本', '請 AI 依範本語氣產出下一週的貼文草稿', '人工挑選與潤飾，並記下常改的地方回饋給 AI'],
      },
      {
        label: '想導入，但不知道從哪開始',
        title: '先做一次「流程盤點」',
        why: '還沒有明確目標時，最有效的做法是先找出時間都花在哪裡。',
        steps: ['請每位同事寫下一週最花時間的 3 件事', '圈出「重複、有固定做法」的項目', '從中選一項範圍最小的先試做'],
      },
    ],
  },
  solo: {
    question: '好的！你最希望 AI 幫你處理哪一類事情？',
    options: [
      {
        label: '寫作：Email、報告、企劃',
        title: '把 AI 當成你的「寫作夥伴」',
        why: '寫作是 AI 最成熟的用途，今天就能開始，而且馬上有感。',
        steps: ['下次寫 Email 前，先把重點條列給 AI 請它起草', '告訴它對象與語氣（例如：對主管、簡潔正式）', '把修改後滿意的版本存起來，下次當範例'],
      },
      {
        label: '整理資料、做摘要與筆記',
        title: '用 AI 做「資料整理助理」',
        why: '長文件、會議記錄、研究資料的摘要，AI 幾秒就能完成初步整理。',
        steps: ['貼一份長文件給 AI，請它列出 5 個重點', '追問「哪些地方需要我特別注意？」', '重要數字與結論務必自己回頭核對原文'],
      },
      {
        label: '學習新技能或準備考試',
        title: '讓 AI 當你的「一對一家教」',
        why: 'AI 可以依你的程度解釋，還能出題考你，學習效率會高很多。',
        steps: ['告訴 AI 你的程度與目標，請它排一份學習計畫', '遇到不懂的概念，請它「用生活例子解釋」', '每學完一段，請它出 5 題小測驗檢查理解'],
      },
      {
        label: '想發展副業或個人品牌',
        title: '用 AI 加速「從想法到第一版」',
        why: '起步階段最缺的是時間，AI 能幫你快速做出可以測試的初版。',
        steps: ['跟 AI 聊你的專長與想法，請它幫忙收斂出 3 個方向', '選一個方向，請它草擬介紹文案與內容大綱', '先發佈小規模內容，觀察回應再調整'],
      },
    ],
  },
  newbie: {
    question: '歡迎！哪一句話最接近你現在的狀況？',
    options: [
      {
        label: '完全沒用過，不知道 AI 能做什麼',
        title: '先從「跟 AI 聊天」開始',
        why: '不需要學任何技術，像傳訊息一樣問問題，就是最好的入門。',
        steps: ['選一個免費的 AI 聊天工具並註冊', '問它一個你今天真的想知道的問題', '試著追問「可以再簡單一點嗎？」感受它如何調整'],
      },
      {
        label: '用過幾次，但覺得回答不太好用',
        title: '學會「把話說清楚」的提問方式',
        why: 'AI 的回答品質，大多取決於你給了多少背景與具體要求。',
        steps: ['提問時加上三件事：你是誰、要做什麼、想要的格式', '不滿意就直接告訴它哪裡不對，請它重寫', '把好用的問法存下來，建立自己的提問筆記'],
      },
      {
        label: '擔心隱私或資訊不正確',
        title: '建立「安全使用」的好習慣',
        why: '這份擔心很合理。了解界線之後，就能放心使用。',
        steps: ['不輸入身分證號、密碼、帳戶等敏感資料', '重要的事實與數字，一定再查一個可靠來源', '把 AI 當助理而不是權威：它給草稿，你做決定'],
      },
      {
        label: '想跟上趨勢，但資訊太多很焦慮',
        title: '只專注「一個工具、一個用途」',
        why: '不需要追每一則新聞。把一個工具用熟，比什麼都試一點更有用。',
        steps: ['選定一個 AI 聊天工具，先不看其他的', '挑一件每週都會做的事，固定請 AI 幫忙', '持續兩週後，再考慮要不要擴大用途'],
      },
    ],
  },
};

const EXPERIENCE = {
  question: '你（或團隊）目前使用 AI 的頻率大概是？',
  options: [
    { id: 'none', label: '幾乎沒用過', tip: '你剛起步，建議每一步都從最小範圍開始，先求有感再求完整。' },
    { id: 'some', label: '偶爾用，還不太熟', tip: '你已經有基礎，重點是把零散的嘗試變成固定習慣。' },
    { id: 'often', label: '經常使用', tip: '你已經很熟悉，可以直接挑戰把多個步驟串成完整流程。' },
  ],
};

const PACE = {
  question: '最後一題：你比較希望用哪種方式前進？',
  options: [
    { id: 'self', label: '先自己試試看', service: '工具選型與教學', serviceNote: '先照上面的步驟動手做，遇到卡關再來找我們挑工具、學用法。' },
    { id: 'guide', label: '希望有人帶著做', service: 'AI 需求診斷', serviceNote: '用一次對話把你的狀況完整盤點，一起訂出專屬的起步計畫。' },
    { id: 'fast', label: '想盡快看到成果', service: '流程自動化', serviceNote: '直接針對這個問題做出第一版，用實際成果來驗證。' },
    { id: 'team', label: '想讓整個團隊一起學', service: '團隊培訓與陪跑', serviceNote: '為團隊設計實作工作坊，並在導入後持續陪伴調整。' },
  ],
};

// ---------- 2. 需求診斷：對話流程 ----------
const chatLog = document.getElementById('chatLog');
const chatOptions = document.getElementById('chatOptions');
const answers = {};
let runId = 0; // 重新開始時，讓舊的延遲訊息失效

function scrollToBottom() {
  chatLog.scrollTop = chatLog.scrollHeight;
}

function addMessage(text, who) {
  const el = document.createElement('div');
  el.className = 'msg msg--' + who;
  el.textContent = text;
  chatLog.appendChild(el);
  scrollToBottom();
  return el;
}

// 機器人說話：先顯示「輸入中」再出現文字，比較像真的對話
function botSay(text) {
  const myRun = runId;
  return new Promise((resolve) => {
    const typing = addMessage('···', 'bot');
    typing.classList.add('msg--typing');
    setTimeout(() => {
      if (myRun !== runId) return; // 已重新開始，丟棄
      typing.classList.remove('msg--typing');
      typing.textContent = text;
      scrollToBottom();
      resolve();
    }, 550);
  });
}

function showOptions(options, onPick) {
  chatOptions.innerHTML = '';
  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option' + (opt.primary ? ' option--primary' : '');
    btn.textContent = opt.label;
    btn.addEventListener('click', () => {
      chatOptions.innerHTML = '';
      if (!opt.silent) addMessage(opt.label, 'user');
      onPick(opt);
    });
    chatOptions.appendChild(btn);
  });
}

async function askRole() {
  await botSay('嗨！我是 AI 顧問小幫手 👋 我會問你 4 個小問題，幫你找出適合的 AI 起步方向。');
  await botSay('首先，哪一個最接近你的身分？');
  showOptions(ROLES, (opt) => {
    answers.role = opt.id;
    askPain();
  });
}

async function askPain() {
  const group = PAINS[answers.role];
  await botSay(group.question);
  showOptions(group.options, (opt) => {
    answers.pain = opt;
    askExperience();
  });
}

async function askExperience() {
  await botSay(EXPERIENCE.question);
  showOptions(EXPERIENCE.options, (opt) => {
    answers.experience = opt;
    askPace();
  });
}

async function askPace() {
  await botSay(PACE.question);
  showOptions(PACE.options, (opt) => {
    answers.pace = opt;
    showResult();
  });
}

async function showResult() {
  await botSay('謝謝你的回答！根據你的狀況，這是我們的建議：');

  const { pain, experience, pace } = answers;
  const card = document.createElement('div');
  card.className = 'result';

  const tag = document.createElement('span');
  tag.className = 'result__tag';
  tag.textContent = '你的 AI 起步建議';

  const title = document.createElement('h3');
  title.textContent = pain.title;

  const why = document.createElement('p');
  why.textContent = pain.why + ' ' + experience.tip;

  const list = document.createElement('ol');
  pain.steps.forEach((s) => {
    const li = document.createElement('li');
    li.textContent = s;
    list.appendChild(li);
  });

  const service = document.createElement('p');
  service.className = 'result__service';
  const strong = document.createElement('strong');
  strong.textContent = '適合你的服務：' + pace.service;
  service.appendChild(strong);
  service.appendChild(document.createElement('br'));
  service.appendChild(document.createTextNode(pace.serviceNote));

  card.append(tag, title, why, list, service);
  chatLog.appendChild(card);
  card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

  showOptions(
    [
      { label: '預約諮詢，聊聊下一步', primary: true, silent: true, action: 'contact' },
      { label: '重新診斷一次', silent: true, action: 'restart' },
    ],
    (opt) => {
      if (opt.action === 'contact') {
        if (window.prefillInquiry) window.prefillInquiry(answers);
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        showOptions([{ label: '重新診斷一次', silent: true }], startChat);
      } else {
        startChat();
      }
    }
  );
}

function startChat() {
  runId += 1;
  chatLog.innerHTML = '';
  chatOptions.innerHTML = '';
  Object.keys(answers).forEach((k) => delete answers[k]);
  askRole();
}

document.getElementById('chatRestart').addEventListener('click', startChat);
startChat();

// ---------- 3. 預約諮詢表單 ----------
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
  const statusEl = document.getElementById('inquiryStatus');
  const submitBtn = document.getElementById('inquirySubmit');
  const openedAt = Date.now();

  const setStatus = (msg, kind) => {
    statusEl.textContent = msg;
    statusEl.className = 'inquiry__status' + (kind ? ' is-' + kind : '');
  };

  // 從需求診斷結果帶入身分與困擾
  const roleText = { biz: '企業主／主管', solo: '上班族／自由工作者／學生', newbie: 'AI 新手' };
  window.prefillInquiry = (ans) => {
    if (!ans) return;
    if (ans.role && roleText[ans.role]) inquiryForm.role.value = roleText[ans.role];
    if (ans.pain && !inquiryForm.message.value) {
      inquiryForm.message.value = '需求診斷結果：' + ans.pain.title + '（' + ans.pain.label + '）';
    }
  };

  inquiryForm.addEventListener('input', (e) => {
    const field = e.target.closest('.field');
    if (field) field.classList.remove('is-invalid');
  });

  inquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(inquiryForm).entries());
    let firstInvalid = null;
    [['name', data.name.trim() !== ''], ['email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())]].forEach(([key, ok]) => {
      const field = inquiryForm[key].closest('.field');
      field.classList.toggle('is-invalid', !ok);
      if (!ok && !firstInvalid) firstInvalid = inquiryForm[key];
    });
    if (firstInvalid) {
      setStatus('請填寫姓名與正確的 Email。', 'error');
      firstInvalid.focus();
      return;
    }

    submitBtn.disabled = true;
    setStatus('送出中…');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, elapsed: Date.now() - openedAt }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || 'send failed');
      inquiryForm.reset();
      setStatus('已收到你的預約，我們會在兩個工作天內以 Email 回覆。', 'ok');
    } catch (err) {
      setStatus('送出失敗，請稍後再試，或直接寄信到 everintelligent.tw@gmail.com。', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}
