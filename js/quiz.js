// ===================================================================
// SafeNet — Quiz Zone logic
// ===================================================================

const QUIZ_DATA = [
  {
    category: "Phishing",
    question: "You receive an SMS: 'Your SBI account will be BLOCKED today. Update KYC at http://sbi-kyc-update.in'. What's the biggest red flag?",
    options: [
      "The message has a link at all",
      "The domain 'sbi-kyc-update.in' doesn't match SBI's real domain, and it uses HTTP",
      "It was sent on a weekday",
      "The bank's name is mentioned"
    ],
    correct: 1,
    explain: "Legitimate bank communications come from verified domains over HTTPS. 'sbi-kyc-update.in' is a lookalike domain designed to deceive — always check the URL carefully before clicking."
  },
  {
    category: "UPI Fraud",
    question: "Someone sends you ₹2,000 'by mistake' and then sends a QR code asking you to scan it to 'return' the money. What should you do?",
    options: [
      "Scan the QR and enter your UPI PIN to send it back",
      "Don't scan it — to receive money you never need to scan a QR or enter a PIN",
      "Call them back immediately and apologise",
      "Forward the QR to a friend to verify"
    ],
    correct: 1,
    explain: "UPI PINs are only required to send/authorise payments, never to receive them. Scanning that QR and entering your PIN would actually send money OUT of your account."
  },
  {
    category: "Identity Theft",
    question: "A 'lucky draw' WhatsApp form asks for your name, Aadhaar number, and a selfie to 'claim your prize'. What's the safest action?",
    options: [
      "Fill it out — it's just for verification",
      "Share only the Aadhaar number, skip the selfie",
      "Don't share any of it — legitimate prizes don't require Aadhaar via WhatsApp forms",
      "Share a slightly modified Aadhaar number"
    ],
    correct: 2,
    explain: "No legitimate contest or company collects Aadhaar numbers and selfies through a WhatsApp form. This is a classic identity-harvesting tactic — never share government ID documents this way."
  },
  {
    category: "Social Engineering",
    question: "You get a video call from someone in a police uniform saying you're under 'digital arrest' for a cybercrime case and must transfer money for 'verification'. What is this?",
    options: [
      "A legitimate police procedure — comply immediately",
      "A 'digital arrest' scam — no such legal process exists in India",
      "A test from your bank",
      "A normal KYC verification call"
    ],
    correct: 1,
    explain: "'Digital arrest' is not a real legal procedure. Police never conduct arrests or demand money transfers over video calls. Hang up and verify independently through official police helpline numbers."
  },
  {
    category: "Job Scams",
    question: "An HR message says you're 'selected' for a ₹35,000/month job but must pay a ₹999 'registration fee' first. This is most likely:",
    options: [
      "A standard hiring practice for good companies",
      "A scam — legitimate employers never charge candidates any fee",
      "Acceptable only if the company is well-known",
      "Normal if the fee is 'refundable'"
    ],
    correct: 1,
    explain: "Real employers never ask candidates to pay money at any stage — for registration, training, equipment, or 'processing'. Any such request is a scam, regardless of how official it sounds."
  },
  {
    category: "Cyberbullying",
    question: "A classmate creates a fake Instagram profile using your photos and starts messaging your friends. What should you do first?",
    options: [
      "Create a fake profile of theirs in retaliation",
      "Ignore it, it'll go away on its own",
      "Take screenshots as evidence, report the profile to Instagram, and inform a trusted adult",
      "Delete your real account"
    ],
    correct: 2,
    explain: "Documenting evidence (screenshots with timestamps), using the platform's reporting tools, and involving a trusted adult or counsellor is the right first response. Impersonation is also reportable under the IT Act."
  },
  {
    category: "Malware",
    question: "A pop-up says 'Your phone has 3 viruses! Tap here to clean now.' What's the best response?",
    options: [
      "Tap it immediately to remove the viruses",
      "Close the browser/app without tapping anything — this is a fake scareware ad",
      "Share the pop-up with friends to warn them",
      "Restart the phone and then tap it"
    ],
    correct: 1,
    explain: "Browsers and apps don't detect 'viruses' via pop-up ads. These are scareware designed to get you to install malicious apps. Simply close the tab/app without interacting with the pop-up."
  },
  {
    category: "Phishing",
    question: "Which of these is the SAFEST way to check if a bank email is genuine?",
    options: [
      "Click the link in the email and log in to check",
      "Reply to the email asking if it's real",
      "Open your bank's app directly or type the official website URL yourself",
      "Forward it to a friend to click first"
    ],
    correct: 2,
    explain: "Always navigate to official channels independently — your bank's app or a manually-typed URL — rather than trusting links or replies, which could be controlled by the attacker."
  },
  {
    category: "UPI Fraud",
    question: "You search online for 'XYZ Bank customer care number' and call the first result. The person asks you to install AnyDesk to 'fix' your account issue. You should:",
    options: [
      "Install it — they're from customer care",
      "Refuse, hang up, and call the number on your bank card/passbook instead",
      "Install it but don't share your screen",
      "Ask them to call you back later"
    ],
    correct: 1,
    explain: "Fake customer care numbers are often planted on search results and social media. Remote access apps like AnyDesk give scammers full control of your device. Always use numbers from official sources like your bank card."
  },
  {
    category: "Identity Theft",
    question: "What's a good habit to protect your Aadhaar when you need to share a photocopy?",
    options: [
      "Share the full Aadhaar photo as-is",
      "Use the masked Aadhaar feature (via mAadhaar/UIDAI) that hides all but the last 4 digits",
      "Write your bank PIN on it for convenience",
      "Post it on social media for proof of identity"
    ],
    correct: 1,
    explain: "Masked Aadhaar, available through the UIDAI website or mAadhaar app, shows only the last 4 digits — reducing the risk if the document is misused or leaked."
  },
  {
    category: "Malware",
    question: "Your friend sends you an APK file on WhatsApp saying 'install this app, it's amazing'. The safest action is:",
    options: [
      "Install it immediately since it's from a friend",
      "Don't install APKs from chat apps — only install from official app stores",
      "Install it but turn off Wi-Fi first",
      "Forward it to other friends to test first"
    ],
    correct: 1,
    explain: "Even if sent by a friend (whose account might be compromised), APK files from outside official app stores bypass security checks and are a common malware distribution method."
  },
  {
    category: "Social Engineering",
    question: "Which of these is a genuine sign of a 'digital arrest' or impersonation scam?",
    options: [
      "The caller asks you to stay on a video call continuously and not contact anyone else",
      "The caller gives you their official badge number and department",
      "The caller suggests you visit the police station in person",
      "The caller asks you to call back on the official helpline"
    ],
    correct: 0,
    explain: "Isolating the victim — keeping them on a continuous call so they can't verify with family, banks, or real authorities — is a hallmark of these scams. Real procedures never require this."
  }
];

let currentQ = 0;
let score = 0;
let answers = []; // store {selected, correct}

const quizCard = document.getElementById('quizCard');
const quizResults = document.getElementById('quizResults');
const quizShell = document.getElementById('quizShell');
const progressBar = document.getElementById('quizProgress');

function init() {
  // Build progress segments
  progressBar.innerHTML = '';
  QUIZ_DATA.forEach((_, i) => {
    const seg = document.createElement('div');
    seg.className = 'quiz-progress-seg';
    seg.dataset.index = i;
    progressBar.appendChild(seg);
  });
  renderQuestion();
}

function renderQuestion() {
  const q = QUIZ_DATA[currentQ];
  updateProgress();

  quizCard.innerHTML = `
    <div class="quiz-meta">
      <span class="quiz-counter">Question ${currentQ + 1} of ${QUIZ_DATA.length}</span>
      <span class="tag tag-teal">${q.category}</span>
    </div>
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options" id="quizOptions"></div>
    <div class="quiz-feedback" id="quizFeedback"></div>
    <div class="quiz-footer">
      <button class="btn btn-primary" id="nextBtn" style="display:none;">
        ${currentQ === QUIZ_DATA.length - 1 ? 'See Results' : 'Next Question'}
      </button>
    </div>
  `;

  const optionsContainer = document.getElementById('quizOptions');
  const letters = ['A', 'B', 'C', 'D'];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => selectAnswer(i));
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  const q = QUIZ_DATA[currentQ];
  const optionButtons = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextBtn');

  const isCorrect = selectedIndex === q.correct;
  if (isCorrect) score++;

  answers.push({ selected: selectedIndex, correct: isCorrect, q });

  optionButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === selectedIndex && i !== q.correct) btn.classList.add('incorrect');
  });

  feedback.innerHTML = `<strong>${isCorrect ? 'Correct! ' : 'Not quite. '}</strong>${q.explain}`;
  feedback.classList.add('show');
  nextBtn.style.display = 'inline-flex';

  nextBtn.addEventListener('click', () => {
    currentQ++;
    if (currentQ < QUIZ_DATA.length) {
      renderQuestion();
    } else {
      showResults();
    }
  });
}

function updateProgress() {
  const segs = document.querySelectorAll('.quiz-progress-seg');
  segs.forEach((seg, i) => {
    seg.classList.remove('done', 'current');
    if (i < currentQ) seg.classList.add('done');
    else if (i === currentQ) seg.classList.add('current');
  });
}

function showResults() {
  quizShell.classList.add('results-mode');
  quizResults.classList.add('show');

  const percent = Math.round((score / QUIZ_DATA.length) * 100);
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (percent / 100) * circumference;

  let tag, message;
  if (percent >= 80) {
    tag = '<span class="tag tag-teal">Cyber Sentinel</span>';
    message = "Excellent! You've internalised the core red flags — you're well-equipped to spot and stop most common scams.";
  } else if (percent >= 50) {
    tag = '<span class="tag tag-amber">Getting There</span>';
    message = "Good start — review the Threat Library sections you missed to sharpen your instincts further.";
  } else {
    tag = '<span class="tag tag-danger">Stay Alert</span>';
    message = "These scams are designed to be convincing. Spend some time in the Threat Library — a little awareness goes a long way.";
  }

  let reviewHTML = '';
  answers.forEach((a, i) => {
    reviewHTML += `
      <div class="quiz-review-item ${a.correct ? 'correct' : 'incorrect'}">
        <span class="icon">${a.correct ? '✓' : '✕'}</span>
        <div><strong style="color:var(--text-primary);">Q${i + 1} (${a.q.category}):</strong> ${a.q.question}</div>
      </div>
    `;
  });

  quizResults.innerHTML = `
    <div class="quiz-score-ring">
      <svg width="160" height="160">
        <circle cx="80" cy="80" r="70" fill="none" stroke="var(--glass-border)" stroke-width="10"/>
        <circle cx="80" cy="80" r="70" fill="none" stroke="var(--teal)" stroke-width="10"
          stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
      </svg>
      <div class="score-text">${percent}%</div>
    </div>
    <div class="quiz-result-tag">${tag}</div>
    <h2 style="margin-bottom:14px;">You scored ${score} out of ${QUIZ_DATA.length}</h2>
    <p style="max-width:480px; margin:0 auto;">${message}</p>
    <div style="display:flex; gap:14px; justify-content:center; margin-top:30px; flex-wrap:wrap;">
      <button class="btn btn-primary" id="retryBtn">Retake Quiz</button>
      <a href="learn.html" class="btn btn-ghost">Review Threat Library</a>
    </div>
    <div class="quiz-review">${reviewHTML}</div>
  `;

  document.getElementById('retryBtn').addEventListener('click', () => {
    currentQ = 0;
    score = 0;
    answers = [];
    quizShell.classList.remove('results-mode');
    quizResults.classList.remove('show');
    renderQuestion();
  });
}

document.addEventListener('DOMContentLoaded', init);
