// ===================================================================
// SafeNet - Password Security page logic
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  const pwInput = document.getElementById('pwInput');
  const pwToggle = document.getElementById('pwToggle');
  const pwFill = document.getElementById('pwMeterFill');
  const pwLabel = document.getElementById('pwLabel');
  const pwAdvice = document.getElementById('pwAdvice');
  const pwScoreTag = document.getElementById('pwScoreTag');
  const passphraseBtn = document.getElementById('passphraseBtn');
  const samplePassphrase = document.getElementById('samplePassphrase');
  const pwSummary = document.getElementById('pwSummary');
  const pwSummaryCopy = document.getElementById('pwSummaryCopy');
  const pwFocus = document.getElementById('pwFocus');
  const pwFocusCopy = document.getElementById('pwFocusCopy');

  const checks = {
    length: { test: pw => pw.length >= 12, el: document.getElementById('checkLength') },
    upper: { test: pw => /[A-Z]/.test(pw), el: document.getElementById('checkUpper') },
    lower: { test: pw => /[a-z]/.test(pw), el: document.getElementById('checkLower') },
    number: { test: pw => /[0-9]/.test(pw), el: document.getElementById('checkNumber') },
    special: { test: pw => /[^A-Za-z0-9]/.test(pw), el: document.getElementById('checkSpecial') },
    common: { test: pw => !isCommonPattern(pw), el: document.getElementById('checkCommon') }
  };

  const COMMON_PATTERNS = ['password', '123456', 'qwerty', 'admin', 'letmein', 'welcome', 'iloveyou', 'abc123', 'india123', 'password123'];
  const WORD_BANK = ['river', 'lantern', 'orbit', 'mint', 'harbor', 'velvet', 'signal', 'forest', 'copper', 'summit', 'ember', 'atlas'];

  function isCommonPattern(pw) {
    const lower = pw.toLowerCase();
    return COMMON_PATTERNS.some(pattern => lower.includes(pattern)) ||
      /^(.)\1+$/.test(pw) ||
      /^(0123|1234|2345|3456|4567|5678|6789)/.test(pw);
  }

  function pickWords() {
    const pool = [...WORD_BANK].sort(() => Math.random() - 0.5);
    return `${pool[0]}-${pool[1]}-${pool[2]}-${pool[3]}${Math.floor(Math.random() * 90) + 10}`;
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
    const scoreText = `Score: ${passCount} / ${total}`;

    if (pwScoreTag) pwScoreTag.textContent = scoreText;

    if (!pwFill || !pwLabel || !pwAdvice) return;

    pwFill.style.width = `${percent}%`;

    let color = 'var(--danger)';
    let label = 'Enter a password to test';
    let advice = 'Aim for a long passphrase with a mix of character types.';
    let summary = 'Waiting for input';
    let summaryCopy = 'Start typing to see whether your password is risky, decent, or strong.';
    let focus = 'Add length';
    let focusCopy = 'Longer passphrases improve security faster than small cosmetic changes.';

    if (pw.length === 0) {
      advice = 'Aim for a long passphrase with a mix of character types.';
    } else if (percent <= 33) {
      label = 'Weak: high risk';
      advice = 'Add more length first, then mix in uppercase letters, numbers, and symbols.';
      summary = 'High risk';
      summaryCopy = 'This password would be easy to guess, reuse, or brute-force if exposed.';
      focus = 'Make it longer';
      focusCopy = 'Start by pushing it past 12 characters, then avoid common words and obvious patterns.';
    } else if (percent <= 66) {
      color = 'var(--amber)';
      label = 'Moderate: improve it';
      advice = 'This is better, but still add length or remove predictable patterns to strengthen it.';
      summary = 'Needs improvement';
      summaryCopy = 'You have some good ingredients, but the password is still more predictable than it should be.';
      focus = 'Break predictability';
      focusCopy = 'Use a longer, more natural passphrase and avoid names, repeated digits, and reused formats.';
    } else if (percent < 100) {
      color = '#5ce0c7';
      label = 'Strong: almost there';
      advice = 'Good progress. Make sure it is unique for this account and not based on personal info.';
      summary = 'Strong base';
      summaryCopy = 'This is in a much safer range, but you should still make it unique for this specific account.';
      focus = 'Keep it unique';
      focusCopy = 'A strong password loses value if you reuse it anywhere else.';
    } else {
      color = 'var(--teal)';
      label = 'Excellent: very strong';
      advice = 'This meets the checker rules. Use a password manager so every account can have a unique password.';
      summary = 'Very strong';
      summaryCopy = 'This password meets all current checks and is in a solid range for everyday account protection.';
      focus = 'Store it safely';
      focusCopy = 'Use a password manager and pair it with two-factor authentication for better real-world protection.';
    }

    pwFill.style.background = color;
    pwLabel.textContent = label;
    pwLabel.style.color = color;
    pwAdvice.textContent = advice;
    if (pwSummary) pwSummary.textContent = summary;
    if (pwSummaryCopy) pwSummaryCopy.textContent = summaryCopy;
    if (pwFocus) pwFocus.textContent = focus;
    if (pwFocusCopy) pwFocusCopy.textContent = focusCopy;
  }

  if (pwInput) {
    pwInput.addEventListener('input', () => evaluatePassword(pwInput.value));
    evaluatePassword('');
  }

  if (pwToggle && pwInput) {
    pwToggle.addEventListener('click', () => {
      const hidden = pwInput.type === 'password';
      pwInput.type = hidden ? 'text' : 'password';
      pwToggle.textContent = hidden ? '🙈' : '👁️';
      pwToggle.setAttribute('aria-label', hidden ? 'Hide password' : 'Show password');
    });
  }

  if (passphraseBtn && samplePassphrase) {
    passphraseBtn.addEventListener('click', () => {
      samplePassphrase.textContent = `Try something like: ${pickWords()}`;
    });
  }
});
