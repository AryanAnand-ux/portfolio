# Aryan Anand | Software Engineer & AI Architect

This is a static portfolio built with Vite and React. It showcases projects, skills, education, contact links, and a small interactive terminal mock in the hero section.

## Tech Stack

- React 19
- Vite 8
- Lucide icons
- Plain CSS files, with shared tokens in `src/index.css`

## Local Development

To run the application locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AryanAnand-ux/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app runs at `http://localhost:5173`.

## Build And Preview

Create a production build and preview it locally:

```bash
npm run build
npm run preview
```

## Project Structure

- `src/App.jsx` wires the one-page layout together.
- `src/components/` contains the sections, shared UI, and the terminal widget.
- `src/data/` stores the project and skills content rendered in the UI.
- `public/` contains the avatar, favicon, resume PDF, and robots file.
- `scripts/create-demo-pdf.mjs` generates the placeholder resume PDF if you need to regenerate it.

## Deployment

This project is ready for static hosting on Vercel, Netlify, GitHub Pages, or any CDN-backed static host.

Recommended production flow:

1. Run `npm run build`.
2. Verify the `dist/` output locally with `npm run preview`.
3. Deploy the contents of `dist/` to your host.
4. Ensure `public/resume.pdf` and `public/avatar.png` are included in the deployment.


##  Future Improvements
- [ ] Incorporate dynamic GitHub API data fetching to statically render up-to-date repository stats.
- [ ] Migrate the codebase to TypeScript for robust typing.
- [ ] Add an MDX-powered blog section.

##  Connect 

* **LinkedIn:** [Aryan Anand](https://www.linkedin.com/in/aryananand-ux)
* **GitHub:** [@AryanAnand-ux](https://github.com/AryanAnand-ux)
* **Email:** [aryan.anand1806@gmail.com](mailto:aryan.anand1806@gmail.com)

---

*Built with passion, robust engineering, and 🍕 by **Aryan Anand**.*
