# Personal Portfolio

A professional, editorial-style personal developer portfolio with a bold typographic hero, inspired by srinivasan.design and Anatolii's portfolio aesthetics.

## Features

- 🎨 **Editorial Design** - Bold Playfair Display serif headers, DM Sans body, generous whitespace
- 📱 **Fully Responsive** - Mobile-first design that scales beautifully
- ⚡ **Fast Performance** - Vite build tool, optimized assets
- 🎭 **Smooth Animations** - Letter-by-letter hero reveal, scroll-triggered section animations
- 📊 **LinkedIn Export Parser** - Auto-populate from LinkedIn data
- 🧩 **shadcn/ui Components** - Accessible, beautiful UI primitives

## Tech Stack

- **React 18+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Scroll animations
- **Lucide React** - Icons
- **Playfair Display** - Display/heading font
- **DM Sans** - Body font

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open browser:** `http://localhost:5173`

---

## Updating Your Profile Data

All content lives in `src/data/profile.json`. Edit this file to update your portfolio.

### Manual Editing (Recommended)

```json
{
  "name": "Pranav S.",
  "headline": "Software Engineer",
  "subheadline": "Building scalable systems and clean experiences. Based in Seattle, WA.",
  "location": "Seattle, WA",
  "about": "Your bio here...",
  "profileUrl": "https://www.linkedin.com/in/your-profile/",
  "githubUrl": "https://github.com/your-username",
  "email": "your.email@example.com",
  "stats": [
    { "label": "Years coding", "value": "4+" },
    { "label": "Companies", "value": "3" },
    { "label": "Projects shipped", "value": "12+" }
  ],
  "experience": [
    {
      "company": "Company Name",
      "role": "Your Role",
      "startDate": "Jan 2022",
      "endDate": "Present",
      "description": ["Achievement 1", "Achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Your Degree",
      "startDate": "2018",
      "endDate": "2022"
    }
  ],
  "skills": {
    "Languages": ["TypeScript", "JavaScript", "Python"],
    "Frameworks": ["React", "Node.js"],
    "Tools": ["Git", "Docker"],
    "Cloud & Infra": ["AWS", "GCP"]
  },
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description...",
      "tech": ["React", "TypeScript"],
      "github": "https://github.com/your-username/project",
      "live": "https://project.example.com"
    }
  ]
}
```

### Using LinkedIn Export Parser

1. **Download your LinkedIn data:**
   - Go to LinkedIn → Settings & Privacy → Data privacy
   - Click "Get a copy of your data"
   - Select "Download larger data archive"
   - Wait for LinkedIn to prepare (10+ minutes)
   - Download the ZIP when ready

2. **Run the parser:**
```bash
npx ts-node scripts/parse-linkedin.ts /path/to/linkedin-export.zip
```

3. **Review and customize:**
   - The script generates `src/data/profile.json`
   - Add missing info: LinkedIn URL, GitHub URL, email
   - Add your projects manually (LinkedIn doesn't export these)
   - Customize stats values

---

## Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui primitives
│   │   ├── Navbar.tsx       # Fixed navigation
│   │   ├── Hero.tsx         # Editorial typographic hero
│   │   ├── About.tsx        # Bio + stats
│   │   ├── Experience.tsx   # Timeline
│   │   ├── Skills.tsx       # Skill pills
│   │   ├── Projects.tsx     # Project cards
│   │   ├── Education.tsx    # Education cards
│   │   ├── Contact.tsx      # CTA section
│   │   └── Footer.tsx       # Footer
│   ├── data/
│   │   └── profile.json     # Your content
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css            # Global styles + fonts
├── scripts/
│   └── parse-linkedin.ts    # LinkedIn parser
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Customization

### Fonts

The portfolio uses:
- **Playfair Display** (serif) for headings
- **DM Sans** (sans-serif) for body

Installed via `@fontsource`. To change weights, update imports in `src/main.tsx`.

### Colors

Edit CSS variables in `src/index.css`:
```css
:root {
  --accent: #6366f1;  /* Indigo */
  --background: #ffffff;
  --foreground: #0d0d0d;
  --muted: #f8fafc;
  --muted-foreground: #64748b;
}
```

### Animations

Adjust in `src/index.css`:
- `.letter-animate` - Hero letter reveal timing
- `.section-hidden` / `.section-visible` - Scroll reveal transitions

---

## Build & Deploy

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

### Deploy to Vercel:

**Option 1: CLI**
```bash
npm install -g vercel
vercel
vercel --prod
```

**Option 2: Drag & Drop**
1. Run `npm run build`
2. Go to [vercel.com](https://vercel.com)
3. Drag `dist` folder to upload

**Option 3: Git Integration**
1. Push to GitHub
2. Import repo in Vercel dashboard
3. Auto-deploys on every push

See `DEPLOY.md` for detailed deployment instructions.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint check |
| `npx ts-node scripts/parse-linkedin.ts <zip>` | Parse LinkedIn export |

---

## Design Notes

### Hero Section
- Massive "Engineer" word at ~20vw font size
- Letter-by-letter staggered entrance (60ms delay each)
- Mouse parallax on individual letters (subtle 3-5px movement)
- Off-white background (#f7f7f5)
- Minimal floating elements: `{ software }` label, name badge, social links

### Rest of Site
- White background with subtle section dividers
- Playfair Display for all section headers
- DM Sans for body text
- Indigo (#6366f1) accent used sparingly
- Cards with left border accent (srinivasan style)
- Scroll-triggered fade-in-up animations

---

## License

MIT License - use this template for your own portfolio!

## Acknowledgments

- [srinivasan.design](https://srinivasan.design) - Editorial design inspiration
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icon library
