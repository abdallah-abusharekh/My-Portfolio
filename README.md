# Abdallah Abusharekh — Portfolio

Personal portfolio of **Abdallah Abusharekh**, a Software Engineer based in Palestine who focuses on frontend development with React, Next.js and TypeScript.

The site is a single-page app built with **React**, **Vite**, **Tailwind CSS** and **Framer Motion**. It uses a dark theme, scroll-driven animations and a data-driven content layer, so updating the portfolio means editing a few TypeScript files rather than touching components.

## Features

- **Scroll-driven intro:** a sticky profile photo that scales, lifts and flips in 3D as you scroll through the Hero and About sections (desktop).
- **Sections:** Hero, About, Toolkit, Selected Work, Experience, Services and Contact, plus a Navbar and Footer.
- **Animated reveals:** elements fade and slide in as they enter the viewport (`useScrollAnimation`).
- **Tech marquee and icons:** an infinite skills marquee, with brand icons from [`simple-icons`](https://simpleicons.org/).
- **Responsive layout:** tuned for mobile, tablet and desktop, including icon-only toolkit cards on small screens.
- **SEO basics:** title, description, author and keyword meta tags in `index.html`.
- **Optimized assets:** all images are served as `.webp`.

## Tech Stack

| Category   | Tools                                  |
| ---------- | -------------------------------------- |
| Framework  | React 18                               |
| Language   | TypeScript                             |
| Build tool | Vite 5                                 |
| Styling    | Tailwind CSS 3, PostCSS, Autoprefixer  |
| Animation  | Framer Motion 11                       |
| Icons      | simple-icons                           |
| Fonts      | Inter, Space Grotesk, JetBrains Mono   |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm

### Installation

```bash
git clone https://github.com/abdallah-abusharekh/My-Portfolio.git
cd My-Portfolio
npm install
```

### Scripts

| Command           | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Start the Vite dev server with hot reload              |
| `npm run build`   | Type-check with `tsc`, then build to `dist/`           |
| `npm run preview` | Serve the production build locally                     |

## Project Structure

```
My-Portfolio/
├── public/                  # Static assets (profile photos, project screenshots, logos)
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── sections/        # Hero, About, Toolkit, Work, Experience, Services, Contact
│   │   └── ui/              # Reusable pieces: AnimatedText, SectionLabel, TechTag, ArrowIcon
│   ├── data/                # Content: profile, projects, experience, skills, socials
│   ├── hooks/               # useScrollAnimation, useMousePosition
│   ├── lib/                 # Small utilities (cn, clamp)
│   ├── App.tsx              # Page composition and scroll-driven intro
│   ├── main.tsx             # React entry point
│   └── index.css            # Tailwind layers and global styles
├── index.html               # HTML shell, meta tags, font imports
├── tailwind.config.js       # Theme colors, fonts, font sizes, keyframes
└── vite.config.ts
```

## Customizing Content

All content lives in `src/data/`, so you can change the site without editing components:

| File                     | What it controls                                                  |
| ------------------------ | ----------------------------------------------------------------- |
| `profile.ts`             | Name, role, location, email, availability, headline, bio, services |
| `projects.ts`            | Project cards: title, description, year, tags, image, links       |
| `experience.ts`          | Work and internship timeline                                      |
| `skills.ts`              | Toolkit categories and marquee items                              |
| `socials.ts`             | GitHub, LinkedIn and email links                                  |

To add a project, put its screenshot in `public/` (preferably `.webp`) and add an entry to `projects.ts`:

```ts
{
  id: "my-project",
  title: "My Project",
  subtitle: "Short one-line summary",
  description: "Longer description of what it does.",
  year: 2026,
  tags: ["REACT", "TYPESCRIPT"],
  image: "/my-project.webp",
  liveUrl: "https://example.com",
  githubUrl: "https://github.com/you/my-project",
}
```

Theme colors (the teal/blue-gray palette), fonts and animation keyframes are defined in `tailwind.config.js`.

## Deployment

`npm run build` outputs a static site to `dist/`, which you can deploy to any static host, such as Vercel, Netlify, GitHub Pages or Cloudflare Pages. On Vercel or Netlify, import the repository and use:

- **Build command:** `npm run build`
- **Output directory:** `dist`

## Contact

- **GitHub:** [@abdallah-abusharekh](https://github.com/abdallah-abusharekh)
- **LinkedIn:** [in/abdallah-abusharekh](https://linkedin.com/in/abdallah-abusharekh)
- **Email:** [abdallahabusharekh66@gmail.com](mailto:abdallahabusharekh66@gmail.com)

---

© Abdallah Abusharekh. All rights reserved.
