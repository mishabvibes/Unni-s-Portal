# Automated Blog System - Setup Guide

This portfolio now includes an automated blog generation system powered by Google's Gemini AI. The system automatically creates 3 new blog posts every week on programming and cybersecurity topics.

## 🎯 Features

- ✨ **AI-Powered Content**: Uses Google Gemini AI to generate high-quality, original blog posts
- 🖼️ **Automatic Images**: Fetches relevant images from Unsplash for each post
- 📅 **Weekly Automation**: Automatically generates 3 posts per week
- 🧹 **Auto-Cleanup**: Keeps only the latest 6-9 posts (3 weeks worth)
- 🏷️ **Smart Tagging**: Automatically generates relevant tags
- ⚡ **Topic Variety**: Mixes programming and cybersecurity topics

## 📋 Prerequisites

1. **Google Gemini API Key**: Get your free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Node.js**: Version 18 or higher
3. **NPM**: Latest version

## 🚀 Setup Instructions

### Step 1: Install Dependencies

Dependencies have already been installed:
- `@google/generative-ai`: For Gemini AI integration
- `node-cron`: For scheduling automated posts

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: For scheduled cron jobs
CRON_SECRET=your_secure_random_string_here

# For production cron jobs
API_BASE_URL=https://your-domain.com
```

### Step 3: Generate Your First Blog Posts

#### Option A: Manual Generation (Testing)

Visit the API endpoint in your browser or use curl:

```bash
# Single blog post
curl -X POST http://localhost:3000/api/generate-blog \
  -H "Content-Type: application/json" \
  -d '{"topic": "Building Real-time Applications", "category": "programming"}'

# Or generate 3 posts at once
curl http://localhost:3000/api/generate-weekly-blogs
```

#### Option B: Automatic Weekly Generation

Set up a cron job to run weekly:

**Local Development:**
```bash
node scripts/setup-cron.js
```

**Production (Vercel):**
Add a cron job in `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/generate-weekly-blogs",
    "schedule": "0 9 * * 1"
  }]
}
```

**Cloud Platforms:**
- **Vercel Cron**: Use their built-in cron feature
- **GitHub Actions**: Schedule a workflow to call the API
- **Heroku Scheduler**: Add a scheduled job
- **AWS Lambda**: Use CloudWatch Events

**Local Server:**
```bash
# Run the setup script (keeps running)
node scripts/setup-cron.js
```

### Step 4: Data Storage

Blog posts are stored in `data/blog-posts.json`. This file is automatically created and managed by the system.

## 📁 Project Structure

```
Portfolio1/
├── app/
│   └── api/
│       ├── generate-blog/route.ts          # Single post generation
│       └── generate-weekly-blogs/route.ts  # Batch generation
├── scripts/
│   ├── generate-weekly-blogs.js            # Cron script
│   └── setup-cron.js                       # Cron setup
├── lib/
│   └── blog.ts                             # Blog data utilities
├── data/
│   └── blog-posts.json                     # Auto-generated posts storage
└── AUTOMATED_BLOG_SETUP.md                 # This file
```

## 🔧 API Endpoints

### 1. Generate Single Blog Post

**Endpoint:** `POST /api/generate-blog`

**Request:**
```json
{
  "topic": "Building Real-time Applications",
  "category": "programming"  // or "cybersecurity"
}
```

**Response:**
```json
{
  "success": true,
  "post": {
    "slug": "building-real-time-applications",
    "title": "...",
    "excerpt": "...",
    "content": "...",
    "date": "2024-01-15",
    "readingTime": 8,
    "tags": ["tag1", "tag2", "tag3"],
    "imageUrl": "https://source.unsplash.com/...",
    "author": {
      "name": "Mishab",
      "avatar": "🧙‍♂️"
    }
  },
  "message": "Blog post generated and saved successfully"
}
```

### 2. Generate 3 Weekly Blog Posts

**Endpoint:** `GET /api/generate-weekly-blogs`

**Headers:** (optional)
```
x-cron-secret: your_cron_secret
```

**Response:**
```json
{
  "success": true,
  "message": "Generated 3 out of 3 blog posts",
  "results": [
    {
      "topic": "...",
      "category": "programming",
      "success": true,
      "data": {...}
    },
    ...
  ]
}
```

## 🎨 Topic Pool

The system has a pool of 30+ topics (15 programming + 15 cybersecurity) that it rotates through. Topics are randomly selected each week to ensure variety.

### Sample Programming Topics:
- Building Real-time Applications with Next.js
- Mastering TypeScript Advanced Types
- Introduction to Server Components in React
- Optimizing Database Queries for Performance
- Building RESTful APIs with Node.js
- And 10+ more...

### Sample Cybersecurity Topics:
- Essential Cybersecurity Practices for Developers
- Understanding OWASP Top 10 Vulnerabilities
- Secure Authentication Implementation
- Protecting Against XSS and CSRF Attacks
- Introduction to Penetration Testing
- And 10+ more...

## 🖼️ Image Integration

Each blog post automatically gets a relevant image from Unsplash based on the topic keywords. The images are:
- Automatically selected based on content
- High quality (1600x900)
- Visually relevant to the post topic
- Free to use

## 🧹 Automatic Cleanup

The system automatically maintains a clean blog feed by:
- Keeping only the latest 6-9 posts (3 weeks worth)
- Removing older posts automatically
- Preventing storage bloat

## 🔒 Security Considerations

1. **API Key Protection**: Store `GEMINI_API_KEY` in environment variables only
2. **Cron Security**: Use `CRON_SECRET` to protect your weekly generation endpoint
3. **Rate Limiting**: Be aware of Gemini API rate limits (generous for free tier)
4. **Input Validation**: The API validates all inputs before processing

## 🧪 Testing

### Test Locally

1. Start your development server:
```bash
npm run dev
```

2. Generate a test post:
```bash
curl -X POST http://localhost:3000/api/generate-blog \
  -H "Content-Type: application/json" \
  -d '{"topic": "Testing AI Blog Generation", "category": "programming"}'
```

3. Check the blog page: Visit `http://localhost:3000/blog`

4. View individual post: Click on the generated post

### Production Testing

1. Set up environment variables
2. Deploy to your hosting platform
3. Call the API endpoint manually first
4. Set up cron job if everything works

## 🐛 Troubleshooting

### "GEMINI_API_KEY is not configured"
- Ensure `.env.local` file exists
- Add `GEMINI_API_KEY=your_key`
- Restart your development server

### "Failed to parse AI response"
- Check your internet connection
- Verify Gemini API is working
- Check API rate limits

### "Failed to generate blog post"
- Verify Gemini API key is valid
- Check console logs for detailed error
- Ensure API quota hasn't been exceeded

### Blog posts not showing
- Check that `data/blog-posts.json` exists
- Verify file permissions
- Ensure blog.ts is loading the file correctly

## 📈 Usage Limits

**Google Gemini Free Tier:**
- 60 requests per minute
- 1,500 requests per day
- Perfect for weekly blog generation

**Beyond Free Tier:**
- Pay-as-you-go pricing
- Very affordable for personal use

## 🎓 Customization

### Adding Custom Topics

Edit `app/api/generate-weekly-blogs/route.ts`:

```typescript
const programmingTopics = [
  'Your custom topic here',
  // ... existing topics
]
```

### Changing Post Frequency

Edit `vercel.json` cron schedule:

```json
{
  "crons": [{
    "path": "/api/generate-weekly-blogs",
    "schedule": "0 9 * * 1"  // Change this
  }]
}
```

### Modifying Content Style

Edit the prompt in `app/api/generate-blog/route.ts`:

```typescript
const prompt = `Your custom prompt here...`
```

## 📚 Resources

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Unsplash API](https://unsplash.com/developers)
- [Node-Cron](https://github.com/node-cron/node-cron)

## 🎉 You're All Set!

Your blog will now automatically generate fresh content every week. Enjoy your automated, AI-powered blog! 🚀

## 📝 Notes

- Posts are generated with original content - not plagiarized
- Images are from Unsplash (royalty-free)
- Content quality improves with each generation
- You can manually trigger generations anytime
- Old posts are automatically removed to keep the blog fresh

