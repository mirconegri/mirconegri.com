# 🌐 mirconegri.com

[![Language](https://img.shields.io/badge/Language-HTML%20%2F%20CSS%20%2F%20JS-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE) [![Deploy](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

My personal portfolio website — a dark, cinematic, multi-section experience built with pure HTML, CSS, and JavaScript.  
No frameworks. No build tools. Just a single `index.html` file, deployed instantly via **Cloudflare Pages**.

---

## 📸 Preview

| Home | Terminal |
|:--:|:--:|
| Hero section with animated boot sequence | Fully interactive fake terminal |

| Projects | Impact |
|:--:|:--:|
| Editorial project showcase | Real-world metrics and data |

---

## ✨ Features

- 🖥️ **Cinematic boot sequence** — black screen, system lines, progress bar, then the UI wakes up
- 🧩 **Multi-section SPA** — 7 interconnected views: `home`, `work`, `timeline`, `terminal`, `impact`, `about`, `contact`
- 💻 **Interactive terminal** — type real commands (`help`, `whoami`, `ls projects`, `open laundrybot`, `stats`, `cd <view>`, `clear` and more)
- 🖱️ **Custom animated cursor** — dot + lagging ring, expands on hover
- 🌐 **Particle canvas** — animated network of green dots in the background
- 🔢 **Animated counters** — numbers count up on scroll
- 📜 **Scroll reveal** — every section fades in as you scroll
- 📡 **Live system clock** — real-time clock in the navbar
- 🎨 **Noise + scanline overlays** — subtle CRT texture on top of everything
- 📱 **Fully responsive** — works on mobile and desktop

---

## 📂 Repository structure

```
mirconegri.com/
└── index.html       → The entire website (single file)
└── README.md        → This file
└── LICENSE          → MIT License
```

---

## 🚀 Live Site

👉 [mirconegri.com](https://mirconegri.com)

Deployed via **Cloudflare Pages** — connected to this GitHub repo.  
Every commit to `main` triggers an automatic deploy in ~30 seconds.

---

## ⚙️ Run locally

No installation needed. Just clone and open:

```bash
git clone https://github.com/mirconegri/mirconegri.com.git
cd mirconegri.com
open index.html   # or double-click the file
```

That's it. No `npm install`, no build step, no dependencies.

---

## 🖥️ Terminal commands

Once on the site, open the **Terminal** section and try:

| Command | Description |
|---|---|
| `help` | List all available commands |
| `whoami` | About me |
| `ls projects` | List all projects |
| `open laundrybot` | LaundryBot details |
| `open scoutmealplanner` | ScoutMealPlanner details |
| `open carnivaleffects` | CarnivalEffects details |
| `cat mission.txt` | My mission statement |
| `cat contact.txt` | Contact info |
| `stats` | Real-world impact numbers |
| `skills` | Tech stack |
| `cd <view>` | Navigate to any section |
| `clear` | Clear the terminal |

---

## 🎨 Design

- **Background:** `#050505` — almost pure black
- **Accent:** `#1D9E75` / `#B7FFD6` — terminal green
- **Text:** `#D0D0D0` — warm off-white
- **Fonts:** [Syne](https://fonts.google.com/specimen/Syne) (headings) + [Space Mono](https://fonts.google.com/specimen/Space+Mono) (terminal/labels) + [Inter](https://fonts.google.com/specimen/Inter) (body)
- **Effects:** noise overlay · scanlines · CSS grid background · canvas particles · custom cursor

---

## 🛠️ Tech Stack

- `HTML5` — structure
- `CSS3` — all styling, animations, responsive layout
- `Vanilla JavaScript` — interactions, terminal, boot sequence, cursor, counters
- `Canvas API` — particle network background
- `Google Fonts` — Syne, Space Mono, Inter
- `Cloudflare Pages` — hosting and deployment
- `Cloudflare Registrar` — domain `mirconegri.com`

---

## 📌 Notes

- Zero external JS libraries — no React, no jQuery, no frameworks
- Single `index.html` file — easy to edit, deploy, and maintain
- Dark mode only — by design
- The terminal is fake but fully functional — commands reveal real content

---

### 👤 Author & Connect

**Mirco Negri** — *Computer Science Student @ UniTrento*

[![Portfolio](https://img.shields.io/badge/Portfolio-00599C?style=for-the-badge&logo=globe&logoColor=white)](https://mirconegri.com)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mirconegri)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mirco-negri-263810225)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mirconegri06@gmail.com)

---

### 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  
<br>
© 2026 Mirco Negri
