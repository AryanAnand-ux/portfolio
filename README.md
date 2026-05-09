# Aryan Anand Portfolio

Static portfolio website for Aryan Anand, a B.Tech CSE student focused on full-stack development, AI, research, and scalable web products.

## Overview

The site is a single-page React application that presents:

- Hero profile card with resume and contact actions
- Interactive terminal mock with portfolio commands and mini games
- Skills grouped by engineering area
- Project cards sourced from structured data
- Extra-curricular and achievement highlights
- Education timeline with an interactive doodle canvas
- Contact and social links

There is no backend, database, authentication layer, or runtime API integration in the current project. The app builds to static files in `dist/` and can be deployed on any static hosting platform.

## Tech Stack

- React 19
- Vite 8
- Lucide React icons
- Plain CSS modules by component
- ESLint 9 flat config

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   ├── avatar.png
│   ├── favicon.svg
│   ├── resume.pdf
│   └── robots.txt
├── scripts/
│   └── create-demo-pdf.mjs
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── data/
    │   ├── projects.js
    │   └── skills.js
    └── components/
```

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

## Content Updates

- Edit projects in `src/data/projects.js`.
- Edit skill groups in `src/data/skills.js`.
- Replace `public/resume.pdf` with the current resume.
- Replace `public/avatar.png` to update profile and preview imagery.
- Update SEO metadata in `index.html`.

## Deployment

Recommended production flow:

```bash
npm install
npm run lint
npm run build
npm run preview
```

Deploy the generated `dist/` directory to Vercel, Netlify, GitHub Pages, Cloudflare Pages, or any CDN-backed static host.

## Production Checklist

- Confirm `public/resume.pdf` is the real resume, not a placeholder.
- Confirm all external project, GitHub, and LinkedIn links are current.
- Run `npm audit --audit-level=moderate` before release.
- Run `npm run lint` and `npm run build` in CI.
- Configure canonical URL and absolute social preview image URL once the production domain is final.

## Future Improvements

- Add automated visual checks with Playwright.
- Add a small test suite for terminal command behavior.
- Migrate to TypeScript when the content model grows.
- Add a CI workflow for lint, audit, and build.
- Consider statically rendered GitHub repository stats if live project data becomes important.

## Contact

- LinkedIn: https://www.linkedin.com/in/aryananand-ux
- GitHub: https://github.com/AryanAnand-ux
- Email: aryan.anand1806@gmail.com
