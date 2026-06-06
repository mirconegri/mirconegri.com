# 🌐 mirconegri.com

[![Language](https://img.shields.io/badge/Language-HTML%20%2F%20CSS%20%2F%20JS-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![Library](https://img.shields.io/badge/Library-Three.js-black?style=for-the-badge&logo=three.js)](https://threejs.org/) [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE) [![Deploy](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

My personal portfolio website — a modern, bilingual, interactive experience built with HTML, CSS, JavaScript, and Three.js.  
No heavy frameworks or build tools. Just a single `index.html` file, deployed instantly via **Cloudflare Pages**.

---

## 📸 Preview & Sections

| Section | Description |
|:--|:--|
| **Hero** | 3D interactive wireframe icosahedron with animated typography. |
| **About** | Personal bio, academic status, and technical skills. |
| **Projects** | Grid of personal projects featuring 3D hover tilt effects. |
| **Education** | Academic timeline and certifications. |
| **Volunteer** | Real-world community impact and associations. |
| **Contact** | Direct links to socials and email. |

---

## ✨ Features

- 🌓 **Light / Dark Mode** — fluid transition between a deep dark theme (`#07070A`) and a crisp light theme (`#F0EEF8`).
- 🌍 **Bilingual Out-of-the-Box** — seamless toggle between Italian (IT) and English (EN) without page reloads.
- 🌌 **Aurora Canvas Background** — real-time 2D canvas animation featuring drifting, morphing color blobs that react to the active theme via composite operations.
- 🧊 **3D Wireframe Hero** — interactive rotating icosahedron built with `Three.js` that tracks mouse movement.
- 🖱️ **Morphing Mouse Orb** — a custom tracking orb that follows the cursor and smoothly morphs its border-radius and hue.
- 🎴 **3D Tilt Cards** — custom vanilla JS perspective calculation that tilts project and volunteer cards based on mouse coordinates.
- 📜 **Scroll Interactions** — animated top progress bar, scroll reveal animations, and a dynamic navbar that hides on downward scroll.
- 📱 **Fully Responsive** — custom mobile menu and fluid CSS grid/clamp typography for all screen sizes.

---

## 📂 Repository structure



[mirconegri.com/](https://github.com/mirconegri/mirconegri.com/tree/main)

```
└── index.html       → The entire website (single file)
└── README.md        → This file
└── LICENSE          → MIT License

```

---

## 🚀 Live Site

👉 [mirconegri.com](https://github.com/mirconegri.com)

Deployed via **Cloudflare Pages** — connected to this GitHub repo.  
Every commit to `main` triggers an automatic deploy in ~30 seconds.

---

## ⚙️ Run locally

No installation or build step needed. Just clone and open:

```bash
git clone [https://github.com/mirconegri/mirconegri.com.git](https://github.com/mirconegri/mirconegri.com.git)
cd mirconegri.com
open index.html   # or double-click the file

```

---

## 🎨 Design

* **Dark Theme:** Base `#07070A` | Surface `#0D0D12` | Text `#F5F7FA`
* **Light Theme:** Base `#F0EEF8` | Surface `#E8E5F4` | Text `#1A1530`
* **Accent Colors:** Purple (`#7c3aed`), Indigo (`#4f46e5`), Cyan (`#06b6d4`)
* **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) (body, headings) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (labels, tags, technical text)

---

## 🛠️ Tech Stack

* `HTML5` — semantic structure and data attributes for localization
* `CSS3` — custom variables (tokens), grid/flexbox layouts, responsive design, animations
* `Vanilla JavaScript` — intersection observers, hover physics, canvas logic, state management
* `Canvas API` — aurora background blending
* `Three.js` — 3D object rendering via CDN
* `Google Fonts` & `FontAwesome` — typography and iconography
* `Cloudflare Pages` — hosting and deployment

---

## 📌 Notes

* Kept as a single `index.html` file to maximize simplicity and maintainability.
* The 3D tilt effects and scrolling animations are built with zero external animation libraries (like GSAP or Framer Motion), relying entirely on optimized Vanilla JS and CSS transitions.

---

### 👤 Author & Connect

**Mirco Negri** — *Computer Science Student @ UniTrento*

---

### 📜 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.




© 2026 Mirco Negri
