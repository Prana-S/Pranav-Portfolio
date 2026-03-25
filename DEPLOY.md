# Deployment Guide

This guide covers multiple deployment options for your portfolio website.

## Prerequisites

Before deploying, ensure you have:

1. Updated your `src/data/profile.json` with your information
2. Tested the build locally: `npm run build`
3. Verified the production preview: `npm run preview`

---

## Option 1: Vercel (Recommended)

Vercel is the easiest and fastest way to deploy your portfolio.

### Method A: Vercel CLI

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N**
   - Project name? (press Enter for default)
   - Directory? (press Enter for root `./`)
   - Override settings? **N**

5. **Production deployment:**
```bash
vercel --prod
```

### Method B: Vercel Dashboard (Drag & Drop)

1. **Build your project:**
```bash
npm run build
```

2. **Go to [vercel.com](https://vercel.com)**

3. **Click "Add New..." → "Project"**

4. **Drag and drop the `dist` folder** onto the upload area

5. **Configure:**
   - Project Name: Your portfolio name
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Click "Deploy"**

### Method C: Git Integration (Automatic Deploys)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [vercel.com](https://vercel.com)**

3. **Click "Add New..." → "Project"**

4. **Import your Git repository**

5. **Configure:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. **Click "Deploy"**

**Benefits:** Automatic deployments on every push to main branch!

---

## Option 2: Netlify

### Method A: Netlify CLI

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Initialize:**
```bash
netlify init
```

4. **Deploy:**
```bash
netlify deploy --prod
```

### Method B: Netlify Drop

1. **Build your project:**
```bash
npm run build
```

2. **Go to [app.netlify.com/drop](https://app.netlify.com/drop)**

3. **Drag and drop the `dist` folder**

4. **Your site is live!**

### Method C: Git Integration

1. **Push code to GitHub**

2. **Go to [app.netlify.com](https://app.netlify.com)**

3. **Click "Add new site" → "Import an existing project"**

4. **Connect to GitHub and select your repo**

5. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `dist`

6. **Click "Deploy site"**

---

## Option 3: GitHub Pages

1. **Install gh-pages:**
```bash
npm install -D gh-pages
```

2. **Update `package.json`:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/portfolio"
}
```

3. **Update `vite.config.ts`:**
```typescript
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
})
```

4. **Deploy:**
```bash
npm run deploy
```

5. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: Deploy from branch → gh-pages → / (root)
   - Click Save

---

## Option 4: Cloudflare Pages

1. **Build your project:**
```bash
npm run build
```

2. **Go to [dash.cloudflare.com](https://dash.cloudflare.com)**

3. **Navigate to Pages → Create a project**

4. **Upload `dist` folder** or connect to Git

5. **Configure:**
   - Build command: `npm run build`
   - Build output directory: `dist`

6. **Click "Deploy"**

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly
- [ ] All sections scroll smoothly
- [ ] Animations work properly
- [ ] Social links are correct
- [ ] Email link works
- [ ] Mobile responsive design
- [ ] Favicon displays
- [ ] Meta tags are correct (for social sharing)

---

## Custom Domain

### On Vercel:

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for propagation (up to 48 hours)

### On Netlify:

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records
4. Enable HTTPS

---

## Environment Variables

If you need environment variables (for analytics, etc.):

### Vercel:
Project Settings → Environment Variables → Add variable

### Netlify:
Site Settings → Environment Variables → Add variable

Example `.env` file (do not commit to Git):
```env
VITE_ANALYTICS_ID=your-analytics-id
```

Access in code:
```typescript
const analyticsId = import.meta.env.VITE_ANALYTICS_ID
```

---

## Performance Optimization

After deployment, consider:

1. **Enable compression** (usually automatic)
2. **Add a sitemap** for SEO
3. **Submit to Google Search Console**
4. **Add Google Analytics** or similar
5. **Test with Lighthouse** for performance scores

---

## Troubleshooting

### Build fails:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 on refresh:
Add a `_redirects` file in `public/`:
```
/*    /index.html   200
```

### Assets not loading:
Check `base` path in `vite.config.ts` matches your deployment path.

---

## Support

For issues or questions:
- Check the [Vite documentation](https://vitejs.dev/)
- Visit [Vercel docs](https://vercel.com/docs)
- Review [Netlify docs](https://docs.netlify.com/)
