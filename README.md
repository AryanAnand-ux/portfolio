# Aryan Anand Portfolio

Static portfolio website for Aryan Anand, a B.Tech CSE student focused on full-stack development, AI, research, and scalable web products.

## Project Overview

This is a single-page React application that presents a personal portfolio with:

- Hero profile section with resume, contact, GitHub, and LinkedIn actions
- Interactive terminal with portfolio commands and small command-line games
- Skills grouped by engineering area
- Project cards sourced from structured data
- Extra-curricular and achievement highlights
- Education timeline with an interactive doodle canvas
- Contact section and footer links

There is no backend, database, authentication layer, or runtime API integration in the current project. The app builds to static files in `dist/` and can be deployed on any static hosting platform.

## Tech Stack

- React 19
- Vite 8
- Lucide React icons
- Plain CSS organized by component
- ESLint 9 flat config

## Architecture

```text
.
|-- index.html
|-- package.json
|-- vite.config.js
|-- eslint.config.js
|-- public/
|   |-- avatar.png
|   |-- favicon.svg
|   |-- resume.pdf
|   `-- robots.txt
|-- scripts/
|   `-- create-demo-pdf.mjs
`-- src/
    |-- App.jsx
    |-- main.jsx
    |-- index.css
    |-- data/
    |   |-- projects.js
    |   `-- skills.js
    `-- components/
        |-- BeyondCode.jsx
        |-- Contact.jsx
        |-- Education.jsx
        |-- Footer.jsx
        |-- Hero.jsx
        |-- Loading.jsx
        |-- MarqueeStrip.jsx
        |-- Navbar.jsx
        |-- ProjectCard.jsx
        |-- Projects.jsx
        |-- Skills.jsx
        |-- Terminal.jsx
        `-- icons.jsx
```

`src/App.jsx` composes the page sections and registers the scroll-reveal observer. Content that is likely to change is kept in `src/data/projects.js` and `src/data/skills.js`.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

On Windows PowerShell, if script execution blocks `npm`, use `npm.cmd`:

```bash
npm.cmd run build
```

## Configuration

The current app does not require runtime environment variables. `.env.example` documents this intentionally.

If future features add API integrations, expose only public client-side values with the `VITE_` prefix. Never commit private API keys, tokens, credentials, or server-only secrets to this repository.

## Content Updates

- Edit project content in `src/data/projects.js`.
- Edit skill groups in `src/data/skills.js`.
- Replace `public/resume.pdf` with the current resume.
- Replace `public/avatar.png` to update profile and social preview imagery.
- Update SEO and social metadata in `index.html`.
- Keep demo links in `projects.js` as `null` unless a real live demo URL exists.

## Quality Checks

Recommended checks before every release:

```bash
npm run lint
npm run build
npm audit --audit-level=moderate
```

Optional dependency review:

```bash
npm outdated
```

## Deployment

Deploy the generated `dist/` directory to a static hosting platform such as Vercel, Netlify, GitHub Pages, Cloudflare Pages, or an S3/CDN-backed host.

Recommended production flow:

```bash
npm ci
npm run lint
npm audit --audit-level=moderate
npm run build
```

## Production Checklist

- Confirm `public/resume.pdf` is the real resume, not a placeholder.
- Confirm all GitHub, LinkedIn, email, and project links are current.
- Configure the final production domain in hosting settings.
- Replace relative social image metadata with absolute URLs if the target platform requires them.
- Add CI to run lint, audit, and build on pull requests.
- Verify the layout on mobile, tablet, and desktop before release.

## Future Improvements

- Add Playwright visual checks for responsive layout and interactive components.
- Add unit tests for terminal command behavior.
- Add a CI workflow for lint, audit, and production build.
- Consider TypeScript if project and skill data grows more complex.
- Consider static GitHub stats generated at build time if live project metrics become useful.

## Contact

- LinkedIn: https://www.linkedin.com/in/aryananand-ux
- GitHub: https://github.com/AryanAnand-ux
- Email: aryan.anand1806@gmail.com
