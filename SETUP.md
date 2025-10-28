# 🚀 Quick Setup Guide

This guide will help you get your portfolio up and running in minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Framer Motion, Tailwind CSS, and more.

## Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your information:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Name
NEXT_PUBLIC_SITE_DESCRIPTION=Your professional description
```

## Step 3: Customize Your Content

### Home Page (`app/page.tsx`)
- Update your name and tagline
- Modify the social links (GitHub, LinkedIn, Twitter, Email)
- Adjust the statistics (projects, years, etc.)

### About Page (`app/about/page.tsx`)
- Add your bio and professional summary
- Update skills and proficiency levels
- Modify the timeline with your experience
- Add your technologies/tools

### Projects Page (`app/projects/page.tsx`)
- Replace sample projects with your own
- Add real project images, descriptions, and links
- Update categories and tags

### Blog Page (`lib/blog.ts`)
- Update sample blog posts
- Or integrate with a CMS (see README for options)

### Contact Page (`app/contact/page.tsx`)
- Update contact information (email, phone, location)
- Configure form submission endpoint

### Navigation & Footer
- Update links in `components/navigation.tsx`
- Modify footer content in `components/footer.tsx`

## Step 4: Customize Styling

### Colors and Theme (`app/globals.css`)
Edit CSS variables for your brand colors:
```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... more colors */
}
```

### Tailwind Config (`tailwind.config.ts`)
Customize colors, fonts, and animations

### Fonts (`app/layout.tsx`)
Change the font family:
```tsx
import { YourFont } from 'next/font/google'
```

## Step 5: Set Up Contact Form

### Option A: Formspree (Recommended for beginners)

1. Go to [formspree.io](https://formspree.io) and sign up
2. Create a new form
3. Copy your form endpoint
4. Add to `.env.local`:
```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-id
```
5. Uncomment the fetch code in `app/contact/page.tsx` (lines ~75-81)

### Option B: Custom API Route

Create `app/api/contact/route.ts` with your email service integration.

## Step 6: Add Your Images

1. Create a `public/` folder if it doesn't exist
2. Add your images:
   - `public/profile.jpg` - Your profile photo
   - `public/projects/` - Project screenshots
   - `public/og-image.jpg` - Open Graph image for social sharing

3. Update image references in components

## Step 7: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

## Step 8: Test Everything

- ✅ Check all pages load correctly
- ✅ Test dark/light mode toggle
- ✅ Verify mobile responsiveness
- ✅ Test form validation and submission
- ✅ Check navigation on all pages
- ✅ Test animations and transitions

## Step 9: Build for Production

```bash
npm run build
```

This creates an optimized production build in `.next/`

Test the production build locally:
```bash
npm run start
```

## Step 10: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Click "Deploy"

Your site will be live in minutes! 🎉

## Common Customizations

### Change Color Scheme
Edit `app/globals.css` CSS variables for both light and dark modes

### Add Google Analytics
1. Get your GA4 Measurement ID
2. Add to `.env.local`:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
3. Add Google Analytics script to `app/layout.tsx`

### Add More Pages
Create new folders in `app/`:
```
app/
  └── your-page/
      └── page.tsx
```

### Integrate Blog CMS
See the "Blog Integration" section in README.md

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Styling not working
```bash
npm run dev
# Make sure Tailwind is compiling
```

### Form not submitting
- Check your Formspree endpoint is correct
- Check browser console for errors
- Verify `.env.local` variables are loaded

### Build errors
```bash
npm run lint
# Fix any linting errors, then:
npm run build
```

## Next Steps

- 📝 Write your first blog post
- 📸 Add professional screenshots
- 🎨 Fine-tune animations and transitions
- 📊 Set up analytics
- 🔍 Optimize SEO metadata
- 🚀 Share your portfolio!

## Need Help?

- Check the main [README.md](README.md) for detailed information
- Review Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Open an issue if you encounter problems

---

**You're all set! Happy building! 🚀**



