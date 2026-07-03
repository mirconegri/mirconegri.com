# 🌐 [mirconegri.com](https://mirconegri.com)

[![Language](https://img.shields.io/badge/Language-HTML%20%2F%20CSS%20%2F%20JS-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![Library](https://img.shields.io/badge/Library-Three.js-black?style=for-the-badge&logo=three.js)](https://threejs.org/) [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE) [![Deploy](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

My personal portfolio website — a modern, bilingual, interactive experience built with HTML, CSS, JavaScript, and Three.js.  
No heavy frameworks or build tools. Just a single `index.html` file, deployed instantly via **Cloudflare Pages**.

---

## 📸 Preview

> Toggle between 🌑 dark and ☀️ light mode — screenshots for both themes below.

| Section | 🌑 Dark | ☀️ Light |
|:--|:--:|:--:|
| **Hero** | ![Hero Dark](assets/hero.png) | ![Hero Light](assets/hero_white.png) |
| **Projects** | ![Projects Dark](assets/projects.png) | ![Projects Light](assets/projects_white.png) |
| **Education** | ![Education Dark](assets/education.png) | ![Education Light](assets/education_white.png) |
| **Volunteering** | ![Volunteering Dark](assets/volunteering.png) | ![Volunteering Light](assets/volunteering_white.png) |
| **Places** | ![Places Dark](assets/places.png) | ![Places Light](assets/places_white.png) |
| **Contact** | ![Contact Dark](assets/contact.png) | ![Contact Light](assets/contact_white.png) |
| **Changelog** | ![Changelog Dark](assets/changelog.png) | ![Changelog Light](assets/changelog_white.png) |
| **About** | *(screenshot missing)* | ![About Light](assets/about_white.png) |
| **Privacy** | ![Privacy Dark](assets/privacy.png) | ![Privacy Light](assets/privacy_white.png) |

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

├── index.html
├── privacy.html
├── css/
│   ├── tokens.css
│   ├── light-mode.css
│   ├── layout.css
│   ├── navbar.css
│   ├── hero.css
│   └── sections.css
└── js/
    ├── aurora.js
    ├── threejs-hero.js
    ├── orb.js
    └── ui.js
```

---

## 🚀 Live Site

👉 [mirconegri.com](https://mirconegri.com)

Deployed via **Cloudflare Pages** — connected to this GitHub repo.  
Every commit to `main` triggers an automatic deploy in ~30 seconds.

---

## ⚙️ Run locally

No installation or build step needed. Just clone and open:

```bash
git clone https://github.com/mirconegri/mirconegri.com.git
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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




© 2026 Mirco Negri
