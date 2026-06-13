# SafeNet — Digital Security Awareness & Cyber Fraud Prevention

A Student Social Responsibility (SSR) project by **Team 36**, B.Tech Cyber Security
(2024–2028), Amrita Vishwa Vidyapeetham, Amritapuri Campus, under the mentorship of
**Smt. Anjana**.

## What's inside

A multi-page, no-build static website (HTML/CSS/vanilla JS — no dependencies, runs anywhere):

| Page | Purpose |
|---|---|
| `index.html` | Home — hero, threat overview, quick links |
| `learn.html` | Threat Library — phishing, UPI fraud, identity theft, social engineering, job scams, cyberbullying, malware, each with red flags, real examples, and protection tips |
| `quiz.html` | 12-question interactive awareness quiz with instant explanations and a results summary |
| `games.html` | Three mini-games: Spot the Phish, Password Strength Lab, Link Checker |
| `report.html` | Reporting procedure, National Cyber Crime Helpline (1930), and key contacts |
| `about.html` | Team details, mentor, and project pillar |

## Design

- **Palette**: deep space navy base with cyber teal, electric violet, amber and danger-red accents
- **Type**: Space Grotesk (display) + Inter (body) + JetBrains Mono (data/labels)
- **Signature element**: animated "Threat Radar" — a glassmorphic scanning visual with floating glass "island" blips
- Fully responsive, keyboard-accessible, respects `prefers-reduced-motion`

## Running locally

No build step required. Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deploying (GitHub Pages)

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to the `main` branch, root folder
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

## Structure

```
safenet/
├── index.html
├── learn.html
├── quiz.html
├── games.html
├── report.html
├── about.html
├── css/
│   ├── style.css      (design system: colors, type, glass, nav, footer)
│   ├── hero.css        (homepage radar visual)
│   ├── learn.css       (threat library components)
│   ├── quiz.css        (quiz UI)
│   ├── games.css        (mini-games UI)
│   ├── report.css       (helpline/report page)
│   └── about.css        (team page)
└── js/
    ├── main.js     (nav, scroll reveals, counters)
    ├── quiz.js     (quiz logic + question bank)
    └── games.js    (mini-game logic)
```
