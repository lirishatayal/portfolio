# Lirisha Tayal — 3D Portfolio

An immersive, space-themed 3D portfolio built with React, React Three Fiber, Framer Motion, and GSAP.

## Features

- **3D Space Environment** — Scroll-based camera movement, particle systems, floating 3D objects
- **Six Main Sections** — Hero, About, Skills, Projects, Experience, Contact
- **Six Interactive Mini-Apps** — Mini Game Zone, Animation Lab, API Explorer, Skill Simulator, Chat Assistant, Theme Customizer
- **Production Architecture** — Modular components, lazy loading, code splitting, responsive design
- **UI/UX** — Glassmorphism, neon glow, custom cursor, loading intro, Konami code easter egg

## Tech Stack

- React 19 + Vite
- React Three Fiber + Drei
- Framer Motion + GSAP
- Tailwind CSS v4

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── interactive/    # Mini-app components
│   ├── layout/         # Navbar, Footer
│   ├── sections/       # Page sections
│   ├── three/          # 3D scene components
│   └── ui/             # Reusable UI primitives
├── context/            # Theme & Modal providers
├── data/               # Static content
├── hooks/              # Custom React hooks
└── utils/              # Helpers
```

## Interactive Components

| Component | Description |
|-----------|-------------|
| `MiniGameZone.jsx` | Memory cards, star catcher, reaction test |
| `AnimationLab.jsx` | Framer Motion & GSAP live demos |
| `ApiApp.jsx` | Weather, movie search, GitHub viewer |
| `SkillSimulator.jsx` | React, CSS, JS interactive demos |
| `ChatAssistant.jsx` | Portfolio Q&A chatbot |
| `ThemeCustomizer.jsx` | Dark/light mode & theme switching |

## License

MIT
