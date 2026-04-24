# Sandra Agustin — Portfolio

Personal portfolio website built with **React + Vite**.

## Stack
- React 18
- Vite 5
- GSAP (animation)
- Google Fonts: Dela Gothic One + Della Respira

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  components/
    Cursor.jsx       — Custom animated cursor
    Navbar.jsx       — Sticky nav + theme toggle
    Hero.jsx         — Landing section w/ particle canvas
    About.jsx        — About me + marquee
    Skills.jsx       — Skills grid
    Projects.jsx     — Sticky stacking scroll projects
    Contact.jsx      — Contact section + footer
  hooks/
    useReveal.js     — Scroll-triggered reveal animations
  index.css          — Global styles + CSS variables
  App.jsx            — Root component + theme logic
  main.jsx           — Entry point
```

## Customization

- **Colors**: Edit CSS variables in `src/index.css` under `:root` (light) and `[data-theme="dark"]`
- **Projects**: Edit the `projects` array in `src/components/Projects.jsx`
- **Links**: Update GitHub, LinkedIn URLs in Contact and Projects components
- **Screenshots**: Replace the placeholder divs in `ProjectCard` with actual `<img>` tags pointing to your screenshots

## Deployment

Push to GitHub, then deploy to Vercel or Netlify:

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/Sandra-Portfolio.git
git push -u origin main
```
