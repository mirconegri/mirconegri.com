# 🌐 mirconegri.com

[![Language](https://img.shields.io/badge/Language-HTML%20%2F%20CSS%20%2F%20JS-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Library](https://img.shields.io/badge/Library-Three.js-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

My personal portfolio website — a modern, bilingual, interactive experience built with HTML, CSS, JavaScript, and Three.js. No heavy frameworks or build tools, deployed instantly via **Cloudflare Pages**.

## Table of Contents

- [Preview](#preview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Design Tokens](#design-tokens)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration and Environment](#configuration-and-environment)
- [Contributing](#contributing)
- [License](#license)

## Preview

> Toggle between 🌑 dark and ☀️ light mode — screenshots for both themes below.

| Section | 🌑 Dark | ☀️ Light |
|:--|:--:|:--:|
| **Hero** | ![Hero Dark](assets/hero.gif) | ![Hero Light](assets/hero_white.png) |
| **Projects** | ![Projects Dark](assets/projects.png) | ![Projects Light](assets/projects_white.png) |
| **Education** | ![Education Dark](assets/education.png) | ![Education Light](assets/education_white.png) |
| **Volunteering** | ![Volunteering Dark](assets/volunteering.png) | ![Volunteering Light](assets/volunteering_white.png) |
| **Places** | ![Places Dark](assets/places.png) | ![Places Light](assets/places_white.png) |
| **Contact** | ![Contact Dark](assets/contact.png) | ![Contact Light](assets/contact_white.png) |
| **Changelog** | ![Changelog Dark](assets/changelog.png) | ![Changelog Light](assets/changelog_white.png) |
| **About** | ![About Dark](assets/about.png) | ![About Light](assets/about_white.png) |
| **Privacy** | ![Privacy Dark](assets/privacy.png) | ![Privacy Light](assets/privacy_white.png) |

## Features

- 🌓 **Light / Dark Mode** — fluid transition between a deep dark theme and a crisp light theme
- 🌍 **Bilingual Out-of-the-Box** — seamless toggle between Italian (IT) and English (EN) without page reloads, driven by `data-it` / `data-en` attributes
- 🌌 **Aurora Canvas Background** — real-time 2D canvas animation with drifting, morphing color blobs that react to the active theme via composite operations
- 🧊 **3D Wireframe Hero** — interactive rotating icosahedron built with Three.js that tracks mouse movement
- 🖱️ **Morphing Mouse Orb** — a custom cursor-tracking orb that smoothly morphs its border-radius and hue
- 🎴 **3D Tilt Cards** — vanilla JS perspective calculation that tilts project and volunteer cards based on mouse coordinates
- 📜 **Scroll Interactions** — animated top progress bar, scroll-reveal animations, and a dynamic navbar that hides on downward scroll
- 🎞️ **Film Grain Overlay** — animated SVG-noise texture layered over the whole page via `js/grain.js`, purely CSS/SVG-driven with zero canvas cost
- ⌛ **Intro Screen** — animated first-visit loading overlay with a typing effect, skippable, shown once per browser session via `sessionStorage`
- ⌘K **Command Palette** — fuzzy-searchable navigation and quick actions (jump to section, toggle theme/language, copy email, open project links)
- 🗺️ **Interactive Experience Map** — custom Canvas 2D world map (Natural Earth-derived borders) with hoverable countries and pinned locations (home, studies, trips, scout routes)
- 📱 **Fully Responsive** — custom mobile menu and fluid CSS grid/clamp typography for all screen sizes
- 📄 **Privacy Policy Pages** — `privacy.html` for the site itself and `lifeos-privacy.html` for the companion LifeOS mobile app, both bilingual
- ✉️ **Contact Form** — submits via Formspree, with a Cloudflare Turnstile-styled placeholder and a required privacy-policy consent checkbox
- 📋 **Copy Email to Clipboard** — one-click email copy with a bilingual success toast

> **Work in progress:** the repository includes `js/scrollytelling.js` (a Three.js + GSAP ScrollTrigger fly-through sequence with a `DEBUG_MODE` waypoint editor), but this script is **not currently loaded** by `index.html` and requires a `house.glb` model plus GSAP/ScrollTrigger/GLTFLoader CDN scripts that aren't wired in yet. Treat it as an unfinished feature rather than active functionality.

## Tech Stack

- **Markup/Styling:** HTML5 (semantic structure with `data-it` / `data-en` localization attributes), CSS3 (custom properties / design tokens, grid/flexbox, responsive design)
- **Scripting:** Vanilla JavaScript — Intersection Observers, canvas rendering, state management, no build step
- **3D:** [Three.js](https://threejs.org/) r128 (CDN) + `OrbitControls` (loaded but only used by the inactive `scrollytelling.js`)
- **Canvas API:** aurora background blending, custom experience map rendering
- **Icons:** Font Awesome 6.5.0 (CDN)
- **Typography:** self-hosted Inter + JetBrains Mono (`@font-face` via `css/fonts.css`) — migrated away from Google Fonts specifically to avoid transmitting visitor IP addresses to Google, per the site's own Privacy Policy
- **Forms:** [Formspree](https://formspree.io/) (contact form backend, no custom server)
- **Hosting/CDN:** Cloudflare Pages

> `index.html` also loads the Leaflet CSS stylesheet from CDN, but no Leaflet JS or `L.map()` calls are present anywhere in the codebase — the experience map is a fully custom Canvas 2D implementation. This CSS import appears to be an unused leftover.

## Design Tokens

Defined in `css/tokens.css`:

- **Dark Theme:** Base `#07070A` · Surface `#0D0D12` · Text `#F5F7FA`
- **Light Theme:** Base `#F8F8FB` · Surface `#F1F2F7` · Text `#0F172A`
- **Accent Colors:** Purple `#7c3aed` · Indigo `#4f46e5` · Cyan `#06b6d4`

## Project Structure

```
mirconegri.com/
├── index.html
├── privacy.html                  # Privacy policy for this site
├── lifeos-privacy.html           # Privacy policy for the companion LifeOS app
├── LICENSE
├── css/
│   ├── tokens.css                # Design tokens, dark/light theme variables, reset
│   ├── light-mode.css            # Light theme overrides
│   ├── layout.css                # Scroll progress, aurora canvas, sections, footer
│   ├── navbar.css                # Fixed navbar and mobile menu
│   ├── hero.css                  # Hero section and CTA buttons
│   ├── sections.css              # About/Projects/Education/Volunteer/Map/Changelog/Contact
│   ├── fonts.css                 # Self-hosted @font-face declarations
│   └── extras.css                # Film grain, intro screen, command palette styles
├── js/
│   ├── aurora.js                 # Animated gradient blob background
│   ├── threejs-hero.js           # 3D wireframe icosahedron in the hero
│   ├── orb.js                    # Cursor-following morphing orb
│   ├── ui.js                     # Navbar, theme/language toggle, reveal, card tilt
│   ├── intro.js                  # First-visit intro overlay
│   ├── grain.js                  # Injects the film grain overlay element
│   ├── map.js                    # Canvas 2D experience map with pins and country hover
│   ├── palette.js                # ⌘K command palette
│   └── scrollytelling.js         # Unused — see Features note above
├── fonts/
│   ├── inter/                    # Referenced by fonts.css (woff2 files)
│   └── jetbrains-mono/           # Referenced by fonts.css (woff2 files)
└── assets/
    ├── CV_Mirco_Negri.pdf        # Referenced by the hero "Download CV" button
    ├── lifeos-icon.png           # Referenced by lifeos-privacy.html
    └── ...                       # Preview screenshots/GIFs referenced above
```

## Getting Started

### Prerequisites

- Any modern web browser
- *(Optional)* A local web server if you want to avoid any `file://`-related restrictions in your browser — not strictly required, as this site uses no microphone/camera APIs

### Installation

No `npm install` or build process required.

```bash
git clone https://github.com/mirconegri/mirconegri.com.git
cd mirconegri.com
open index.html   # or double-click the file
```

## Usage

- **Live site:** [mirconegri.com](https://mirconegri.com)
- **Locally:** open `index.html` directly, or serve the folder with any static file server (e.g. `python3 -m http.server 8000`) and visit `http://localhost:8000`

Deployed via **Cloudflare Pages**, connected to this GitHub repository — every commit to `main` triggers an automatic deploy in roughly 30 seconds.

## Configuration and Environment

This is a fully static site — no `.env` file or build-time environment variables are used. The only external integration point is the contact form:

| Item | Location | Notes |
|---|---|---|
| Formspree endpoint | `index.html`, `<form action="https://formspree.io/f/xpqedpyo">` | Tied to the author's Formspree account — replace with your own endpoint ID to reuse this form |
| CV file | `assets/CV_Mirco_Negri.pdf` | Referenced by the hero "Download CV" button; provide your own file at this path |
| LifeOS icon | `assets/lifeos-icon.png` | Referenced by `lifeos-privacy.html` |

## Contributing

This is a personal portfolio project, but suggestions and bug reports are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes with a clear message
4. Open a Pull Request

Found a bug or broken link? Open an [Issue](https://github.com/mirconegri/mirconegri.com/issues).

### 👤 Author & Connect

**Mirco Negri** — *Computer Science Student @ UniTrento*

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
<br>
© 2026 Mirco Negri
