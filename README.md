# Aryan Anand | Software Engineer & AI Architect

A highly optimized, production-ready personal portfolio built with React and Vite. Showcasing a striking "Neo-Brutalist" frontend aesthetic, this application provides dynamic micro-interactions, a fluid asymmetric "Bento Grid" architecture, and a heavily optimized CSS variable design system.

![Aryan's Portfolio Preview](/public/favicon.svg)

## ✨ Core Features

- **Strict Neo-Brutalist UI:** High-contrast borders, solid tactile drop shadows, and modern pastel color coordination utilizing a custom dot-grid background.
- **Bento Grid Architecture:** Clean, asymmetrical CSS grid layouts for showcasing complex project payloads and skills data.
- **Fluid Micro-Interactions:** Custom cubic-bezier animations, viewport scroll-spy integration (Intersection Observer), and extremely satisfying pop-up hover states.
- **Lightning Fast Performance:** Uses zero bloated framework utilities. Completely optimized via global CSS variable design tokens and Vite's rapid build system.
- **Fully Responsive Navigation:** Custom mobile overlay navigation seamlessly scaling from ultra-wide monitors natively down to mobile phones.

## 🛠 Tech Stack

- **Framework:** React 19 + Vite 6
- **Styling:** Vanilla Modern CSS (Zero dependencies, pure CSS Variables strategy)
- **Icons:** `lucide-react` & Custom SVGs
- **Deployment:** Vercel / Netlify / GitHub Pages (Static Generation)

## 🚀 Running Locally

To run this application locally on your machine, follow these standard Node.js steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AryanAnand-ux/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment variables:**
   - Copy the `.env.example` file to create your own configuration if any services are added:
   ```bash
   cp .env.example .env
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The application will boot instantly at `http://localhost:5173`.*

## 📦 Deployment Instructions

This portfolio is heavily optimized and compiles down to lightweight static assets natively. 

1. **Verify the Production Build:**
   ```bash
   npm run build
   ```
2. **Deploy to Vercel or Netlify:**
   - Simply connect your GitHub repository to Vercel/Netlify.
   - The platform will automatically detect Vite and orchestrate the build command `npm run build` with the output directory `dist/`.

> **Note on Resumes:** To enable the Resume download feature, simply drop your actual `resume.pdf` file directly into the local `public/` directory. The application handles routing to `<a href="/resume.pdf">` automatically. Make sure the file is explicitly named `resume.pdf`.

## 🔮 Future Improvements
- [ ] Incorporate dynamic GitHub API data fetching to statically render up-to-date repository stats.
- [ ] Migrate the codebase to TypeScript for robust typing.
- [ ] Add an MDX-powered blog section.

## 🤝 Connect 

* **LinkedIn:** [Aryan Anand](https://www.linkedin.com/in/aryananand-ux)
* **GitHub:** [@AryanAnand-ux](https://github.com/AryanAnand-ux)
* **Email:** [aryan.anand1806@gmail.com](mailto:aryan.anand1806@gmail.com)

---

*Built with passion, robust engineering, and 🍕 by **Aryan Anand**.*
