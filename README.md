# SafeNet | Digital Security Awareness & Cyber Fraud Prevention

A Student Social Responsibility (SSR) project by **Team 36**, B.Tech Cyber Security
(2024–2028), Amrita Vishwa Vidyapeetham, Amritapuri Campus, under the mentorship of
**Smt. Anjana**.

## What's inside

A multi-page static website built with plain HTML, CSS, and vanilla JavaScript. No dependencies and no build step.

| Page | Purpose |
|---|---|
| `index.html` | Home page with hero, threat overview, and quick links |
| `learn.html` | Threat Library covering phishing, UPI fraud, identity theft, social engineering, job scams, cyberbullying, and malware |
| `quiz.html` | 12-question interactive awareness quiz with instant explanations and a results summary |
| `games.html` | Three mini-games: Spot the Phish, Password Strength Lab, Link Checker |
| `password.html` | Dedicated password security page with a live password strength checker and safer password guidance |
| `report.html` | Reporting procedure, National Cyber Crime Helpline 1930, and key contacts |
| `about.html` | Team details, mentor, and project pillar |

## Design

- **Palette**: deep space navy base with cyber teal, electric violet, amber and danger-red accents
- **Type**: Space Grotesk (display) + Inter (body) + JetBrains Mono (data/labels)
- **Signature element**: animated "Threat Radar", a glassmorphic scanning visual with floating glass "island" blips
- Fully responsive, keyboard-accessible, respects `prefers-reduced-motion`

## Running locally

No build step is required. Open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

## GitHub Pages

1. Push this repo to GitHub.
2. Open **Settings > Pages**.
3. Set the source to the `main` branch and the root folder.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

## Structure

```
safenet/
├── index.html
├── learn.html
├── quiz.html
├── games.html
├── password.html
├── report.html
├── about.html
├── css/
│   ├── style.css      (design system: colors, type, glass, nav, footer)
│   ├── hero.css        (homepage radar visual)
│   ├── learn.css       (threat library components)
│   ├── quiz.css        (quiz UI)
│   ├── games.css        (mini-games UI)
│   ├── password.css     (password security page)
│   ├── report.css       (helpline/report page)
│   └── about.css        (team page)
└── js/
    ├── main.js     (nav, scroll reveals, counters)
    ├── quiz.js     (quiz logic + question bank)
    ├── games.js    (mini-game logic)
    └── password.js (password checker logic)
```
