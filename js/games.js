// ===================================================================
// SafeNet — Mini Games
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --------------------- Tab switching ---------------------
  const tabs = document.querySelectorAll('.game-tab');
  const panels = document.querySelectorAll('.game-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });

  // --------------------- Game 1: Spot the Phish ---------------------
  const REDFLAGS = ['URGENT', 'BLOCKED', 'verify-now', 'OTP', '24', 'http://secure-update-bank.in', 'immediately'];
  let foundFlags = new Set();

  const phishMessage = document.getElementById('phishMessage');
  const phishScore = document.getElementById('phishScore');
  const phishFoundList = document.getElementById('phishFoundList');
  const phishRestart = document.getElementById('phishRestart');

  function initPhishGame() {
    foundFlags = new Set();
    if (phishScore) phishScore.textContent = `0 / ${REDFLAGS.length}`;
    document.querySelectorAll('.phish-found-item').forEach(el => el.classList.remove('show'));
    document.querySelectorAll('.phish-word').forEach(el => {
      el.classList.remove('found', 'wrong-pick');
    });
  }

  if (phishMessage) {
    phishMessage.querySelectorAll('.phish-word').forEach(word => {
      word.addEventListener('click', () => {
        const flag = word.dataset.flag;
        if (word.classList.contains('found')) return;

        if (REDFLAGS.includes(flag)) {
          word.classList.add('found');
          foundFlags.add(flag);
          phishScore.textContent = `${foundFlags.size} / ${REDFLAGS.length}`;
          const item = document.querySelector(`.phish-found-item[data-flag="${flag}"]`);
          if (item) item.classList.add('show');
        } else {
          word.classList.add('wrong-pick');
          setTimeout(() => word.classList.remove('wrong-pick'), 400);
        }
      });
    });
  }

  if (phishRestart) phishRestart.addEventListener('click', initPhishGame);
  initPhishGame();

  // --------------------- Game 2: Password Lab ---------------------
  const pwInput = document.getElementById('pwInput');
  const pwToggle = document.getElementById('pwToggle');
  const pwFill = document.getElementById('pwMeterFill');
  const pwLabel = document.getElementById('pwLabel');

  const checks = {
    length: { test: pw => pw.length >= 12, el: document.getElementById('checkLength') },
    upper: { test: pw => /[A-Z]/.test(pw), el: document.getElementById('checkUpper') },
    lower: { test: pw => /[a-z]/.test(pw), el: document.getElementById('checkLower') },
    number: { test: pw => /[0-9]/.test(pw), el: document.getElementById('checkNumber') },
    special: { test: pw => /[^A-Za-z0-9]/.test(pw), el: document.getElementById('checkSpecial') },
    common: { test: pw => !isCommonPattern(pw), el: document.getElementById('checkCommon') }
  };

  const COMMON_PATTERNS = ['password', '123456', 'qwerty', 'admin', 'letmein', 'welcome', 'iloveyou', 'abc123', 'india123', 'password123'];

  function isCommonPattern(pw) {
    const lower = pw.toLowerCase();
    return COMMON_PATTERNS.some(p => lower.includes(p)) || /^(.)\1+$/.test(pw) || /^(0123|1234|2345|3456|4567|5678|6789)/.test(pw);
  }

  function evaluatePassword(pw) {
    let passCount = 0;
    Object.values(checks).forEach(check => {
      const passed = pw.length > 0 && check.test(pw);
      if (check.el) check.el.classList.toggle('pass', passed);
      if (passed) passCount++;
    });

    const total = Object.keys(checks).length;
    const percent = pw.length === 0 ? 0 : (passCount / total) * 100;

    if (pwFill) {
      pwFill.style.width = percent + '%';
      let color, label;
      if (pw.length === 0) { color = 'var(--danger)'; label = 'Enter a password to test'; }
      else if (percent <= 33) { color = 'var(--danger)'; label = 'Weak: easily cracked in seconds'; }
      else if (percent <= 66) { color = 'var(--amber)'; label = 'Moderate: could be stronger'; }
      else if (percent < 100) { color = '#5ce0c7'; label = 'Strong: good password'; }
      else { color = 'var(--teal)'; label = 'Excellent: very strong password'; }

      pwFill.style.background = color;
      if (pwLabel) {
        pwLabel.textContent = label;
        pwLabel.style.color = color;
      }
    }
  }

  if (pwInput) {
    pwInput.addEventListener('input', () => evaluatePassword(pwInput.value));
    evaluatePassword('');
  }

  if (pwToggle) {
    pwToggle.addEventListener('click', () => {
      const isPassword = pwInput.type === 'password';
      pwInput.type = isPassword ? 'text' : 'password';
      pwToggle.textContent = isPassword ? '🙈' : '👁️';
    });
  }

  // --------------------- Game 3: Link Checker ---------------------
  const LINK_ITEMS = [
    { url: 'https://www.onlinesbi.sbi/login', safe: true, explain: "Correct. 'onlinesbi.sbi' is SBI's genuine domain with HTTPS encryption." },
    { url: 'http://onlinesbi-secure-login.com/verify', safe: false, explain: "This is a fake lookalike domain. The real SBI site doesn't use '-secure-login' or a .com TLD for net banking, and it's not HTTPS." },
    { url: 'https://www.amazon.in/orders', safe: true, explain: "Correct. This is Amazon's genuine domain and order page." },
    { url: 'https://amaz0n-rewards.in/claim-prize', safe: false, explain: "Notice the zero in 'amaz0n' replacing the letter 'o'. That's a classic typosquatting trick to fool quick readers." },
    { url: 'https://accounts.google.com/signin', safe: true, explain: "Correct. This is Google's genuine sign-in subdomain." },
    { url: 'https://bit.ly/claim-kbc-lottery-2026', safe: false, explain: "Shortened links hide their real destination, and 'KBC lottery' messages are a well-known long-running scam in India." }
  ];

  const linkGameList = document.getElementById('linkGameList');
  const linkScore = document.getElementById('linkScore');
  const linkRestart = document.getElementById('linkRestart');
  let linkScoreCount = 0;

  function buildLinkGame() {
    linkScoreCount = 0;
    if (linkScore) linkScore.textContent = `0 / ${LINK_ITEMS.length}`;
    if (!linkGameList) return;
    linkGameList.innerHTML = '';

    LINK_ITEMS.forEach((item, idx) => {
      const row = document.createElement('div');
      row.className = 'link-game-item glass';
      row.innerHTML = `
        <div class="link-url">${item.url}</div>
        <div class="link-actions">
          <button class="link-btn" data-choice="safe" data-idx="${idx}">Safe ✓</button>
          <button class="link-btn" data-choice="unsafe" data-idx="${idx}">Suspicious ⚠</button>
        </div>
        <div class="link-explain" id="linkExplain${idx}">${item.explain}</div>
      `;
      linkGameList.appendChild(row);
    });

    linkGameList.querySelectorAll('.link-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        const choice = btn.dataset.choice;
        const item = LINK_ITEMS[idx];
        const isCorrect = (choice === 'safe' && item.safe) || (choice === 'unsafe' && !item.safe);

        // Disable both buttons in this row
        const row = btn.closest('.link-game-item');
        row.querySelectorAll('.link-btn').forEach(b => b.disabled = true);

        btn.classList.add(isCorrect ? 'correct-pick' : 'wrong-pick');
        if (!isCorrect) {
          // highlight the right answer too
          const correctChoice = item.safe ? 'safe' : 'unsafe';
          row.querySelector(`.link-btn[data-choice="${correctChoice}"]`).classList.add('correct-pick');
        } else {
          linkScoreCount++;
          linkScore.textContent = `${linkScoreCount} / ${LINK_ITEMS.length}`;
        }

        document.getElementById(`linkExplain${idx}`).classList.add('show');
      });
    });
  }

  if (linkRestart) linkRestart.addEventListener('click', buildLinkGame);
  buildLinkGame();

});
