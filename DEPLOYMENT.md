# 🚀 Deployment Guide

Comprehensive guide for deploying your portfolio to various platforms.

## Quick Deploy Options

### 🎯 Vercel (Recommended)

Vercel is the recommended platform as it's built by the creators of Next.js.

#### Method 1: GitHub Integration (Easiest)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Visit [vercel.com](https://vercel.com) and sign up
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL`: Your production URL
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT`: Your Formspree endpoint
   - Any other secrets
7. Click "Deploy"

Your site will be live at `https://your-project.vercel.app`

#### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production
vercel --prod
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### 🌐 Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Set environment variables
6. Click "Deploy site"

### ▲ Railway

1. Push to GitHub
2. Visit [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Next.js
6. Add environment variables
7. Deploy!

### 🐳 Docker (Self-hosted)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## Pre-Deployment Checklist

### 1. Environment Variables

Ensure all environment variables are set in your deployment platform:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your Name
NEXT_PUBLIC_SITE_DESCRIPTION=Your description
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_endpoint
```

### 2. Build Test

Test the production build locally:

```bash
npm run build
npm run start
```

Check for:
- ✅ No build errors
- ✅ All pages load correctly
- ✅ Images display properly
- ✅ Forms work
- ✅ Dark mode toggles correctly
- ✅ Mobile responsive

### 3. Performance Optimization

Run Lighthouse audit:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Aim for 90+ scores

### 4. SEO Optimization

- ✅ Update metadata in `app/layout.tsx`
- ✅ Add `robots.txt`:

```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

- ✅ Create `sitemap.xml`:

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/about</loc>
    <priority>0.8</priority>
  </url>
  <!-- Add more URLs -->
</urlset>
```

### 5. Analytics Setup (Optional)

#### Google Analytics

1. Get your GA4 Measurement ID
2. Add to `.env`:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

3. Add to `app/layout.tsx`:
```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
```

#### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

// Inside return:
<Analytics />
```

## Custom Domain Setup

### Vercel

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for DNS propagation (usually < 1 hour)

### DNS Configuration

Add these records to your DNS provider:

**For root domain (example.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Continuous Deployment

### Auto-Deploy on Push

With Vercel/Netlify GitHub integration:
- Every push to `main` → automatic production deploy
- Pull requests → preview deployments
- Automatic HTTPS certificates
- Instant rollbacks

### Deployment Workflow

```bash
# 1. Work on feature branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "Add new feature"

# 3. Push and create PR
git push origin feature/new-feature

# 4. Preview deployment created automatically

# 5. After approval, merge to main
# Production deployment triggers automatically
```

## Post-Deployment

### 1. Verify Deployment

- ✅ Check all pages load
- ✅ Test forms and interactivity
- ✅ Verify environment variables
- ✅ Check mobile responsiveness
- ✅ Test dark mode
- ✅ Verify analytics tracking

### 2. Set Up Monitoring

Consider adding:
- **Sentry**: Error tracking
- **Vercel Analytics**: Performance monitoring
- **Google Search Console**: SEO monitoring
- **Uptime monitoring**: e.g., UptimeRobot

### 3. Submit to Search Engines

**Google Search Console:**
1. Verify ownership
2. Submit sitemap
3. Check for indexing issues

**Bing Webmaster Tools:**
1. Add and verify site
2. Submit sitemap

### 4. Share Your Portfolio

- 📱 Update LinkedIn profile
- 🐦 Share on Twitter
- 💼 Add to resume
- 📧 Email contacts
- 🌐 Submit to portfolios showcase sites

## Troubleshooting

### Build Fails

```bash
# Check build locally
npm run build

# Common fixes:
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Restart dev server after changing `.env.local`
- Check deployment platform has variables set

### Images Not Loading

- Verify images are in `public/` folder
- Check Next.js Image configuration in `next.config.js`
- Add remote image domains if using external images

### Form Not Submitting

- Check Formspree endpoint is correct
- Verify CORS settings if using custom API
- Check browser console for errors

## Rollback

### Vercel

1. Go to "Deployments" tab
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Manual Rollback

```bash
git revert HEAD
git push origin main
```

## Performance Tips

- ✅ Use Next.js Image component
- ✅ Enable static generation where possible
- ✅ Minimize client-side JavaScript
- ✅ Optimize images before uploading
- ✅ Use code splitting
- ✅ Enable caching headers
- ✅ Use CDN (Vercel provides this automatically)

## Security

- ✅ Use environment variables for secrets
- ✅ Never commit `.env.local`
- ✅ Enable HTTPS (automatic with Vercel)
- ✅ Set up security headers in `next.config.js`
- ✅ Sanitize user inputs
- ✅ Keep dependencies updated

## Costs

### Vercel Free Tier
- 100 GB bandwidth/month
- Unlimited websites
- Automatic HTTPS
- Perfect for personal portfolios

### Vercel Pro ($20/month)
- 1 TB bandwidth
- Advanced analytics
- Custom deployment protections

Most personal portfolios fit comfortably in the free tier!

---

**Your portfolio is now live! 🎉**

Remember to keep your content updated and showcase your best work!



