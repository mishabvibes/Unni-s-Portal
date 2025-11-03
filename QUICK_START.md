# 🚀 Quick Start Guide - Automated Blog System

Get your automated blog running with Google Sheets as your database!

## Step 1: Set Up Google Sheets Database (5 minutes)

Your blog uses **Google Sheets** as the database! 

1. Follow the complete setup guide: **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)**
2. Or use the quick checklist below:

### Quick Checklist:
- ✅ Create Google Cloud Project
- ✅ Enable Google Sheets API
- ✅ Create Service Account
- ✅ Download JSON credentials
- ✅ Create Google Sheet
- ✅ Share sheet with service account
- ✅ Copy credentials to `.env.local`

## Step 2: Get Gemini API Key (2 minutes)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

**It's FREE and includes:**
- 60 requests per minute
- 1,500 requests per day
- Perfect for weekly blog generation

## Step 3: Configure Environment (2 minutes)

1. Create `.env.local` in your project root:
```bash
cp ENV_EXAMPLE.txt .env.local
```

2. Open `.env.local` and add:
```env
# Google Sheets Configuration (from setup)
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_ID=your_sheet_id_here

# Gemini API Key
GEMINI_API_KEY=paste_your_api_key_here
```

## Step 4: Test It Out (2 minutes)

1. Start your dev server:
```bash
npm run dev
```

2. Open a new terminal and test the API:
```bash
# Generate a single blog post
curl -X POST http://localhost:3000/api/generate-blog \
  -H "Content-Type: application/json" \
  -d '{"topic": "Building Modern Web Apps", "category": "programming"}'
```

3. Visit your blog: [http://localhost:3000/blog](http://localhost:3000/blog)

You should see your new AI-generated post! 🎉

## Step 5: Generate 3 Posts Weekly

### For Vercel (Recommended):

Your `vercel.json` is already configured! Just deploy:
```bash
git push
```

The cron job will run automatically every Monday at 9 AM UTC.

### For Other Platforms:

See `AUTOMATED_BLOG_SETUP.md` for detailed setup instructions.

## 🎯 You're Done!

Your blog will now:
- ✅ Generate 3 posts every week automatically
- ✅ Include relevant images from Unsplash
- ✅ Cover programming and cybersecurity topics
- ✅ Store all posts in Google Sheets (unlimited!)
- ✅ Keep all posts (no auto-deletion)
- ✅ Tag posts automatically
- ✅ Easy to view and manage posts

## 📚 Next Steps

- Read `AUTOMATED_BLOG_SETUP.md` for advanced configuration
- Read `GOOGLE_SHEETS_SETUP.md` for complete Sheets setup
- Customize topics in `app/api/generate-weekly-blogs/route.ts`
- Modify AI prompts for different writing styles
- Add more categories or topics

## 🆘 Need Help?

- **Google Sheets issues**: Check `GOOGLE_SHEETS_SETUP.md` troubleshooting
- **API issues**: Check `AUTOMATED_BLOG_SETUP.md` troubleshooting
- Verify your API keys are correctly set
- Make sure you have internet connection for API calls
- Check browser console for errors

## 💡 Pro Tips

1. **Test first**: Generate a few posts manually before setting up automation
2. **Monitor initially**: Check the first few automated generations in your Google Sheet
3. **Customize**: Adjust topics and prompts to match your style
4. **View all posts**: Open your Google Sheet anytime to see all blog posts
5. **Edit manually**: You can edit posts directly in Google Sheets if needed

## 🎊 Why Google Sheets?

- ✅ **Free** - No database costs
- ✅ **Unlimited** - Store as many posts as you want
- ✅ **Visual** - See all posts in a spreadsheet
- ✅ **Easy** - Edit posts directly in Sheets
- ✅ **Reliable** - Google's infrastructure

Enjoy your automated blog! 🚀

