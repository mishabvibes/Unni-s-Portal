# Google Sheets Database Setup Guide

Your blog system now uses Google Sheets as the database for storing AI-generated blog posts!

## 🎯 Why Google Sheets?

- ✅ **Free** - No database costs
- ✅ **Easy to view** - See all posts in a spreadsheet
- ✅ **No limits** - Store unlimited posts
- ✅ **Accessible** - Edit posts manually if needed
- ✅ **Reliable** - Google's infrastructure

## 📋 Prerequisites

1. **Google Account** - Any Google account works
2. **Google Cloud Project** - Create one at [Google Cloud Console](https://console.cloud.google.com/)

## 🚀 Setup Instructions

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project"
3. Enter project name (e.g., "Portfolio Blog")
4. Click "Create"

### Step 2: Enable Google Sheets API

1. In your project, go to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

### Step 3: Create Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Enter a name (e.g., "blog-sheets-service")
4. Click **Create and Continue**
5. Skip the optional steps and click **Done**

### Step 4: Create and Download Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create New Key**
4. Choose **JSON** format
5. Click **Create** (file will download automatically)

### Step 5: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Portfolio Blog Posts" (or any name you prefer)
4. Copy the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```

### Step 6: Share Sheet with Service Account

1. Click the **Share** button in Google Sheets
2. Add the **email** from your downloaded JSON file
   - Look for `"client_email": "xxx@xxx.iam.gserviceaccount.com"` in the JSON
3. Give it **Editor** permissions
4. Click **Send**

### Step 7: Configure Environment Variables

Add these to your `.env.local`:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_ID=your_sheet_id_here

# Gemini API (existing)
GEMINI_API_KEY=your_gemini_api_key
```

**Important Notes:**

- Copy the `client_email` and `private_key` from your downloaded JSON file
- The `private_key` should include the `\n` line breaks exactly as shown
- Replace `your_sheet_id_here` with the Sheet ID from Step 5

### Step 8: Restart Your Dev Server

```bash
npm run dev
```

## ✅ Testing the Setup

### Test 1: Generate a Blog Post

```bash
curl -X POST http://localhost:3000/api/generate-blog -H "Content-Type: application/json" -d '{"topic": "Testing Google Sheets Integration", "category": "programming"}'
```

### Test 2: Check Your Google Sheet

1. Open your Google Sheet
2. You should see a new row with the blog post data
3. Headers should be automatically created: `slug`, `title`, `excerpt`, etc.

### Test 3: View Posts

Visit `http://localhost:3000/blog` - your new post should appear!

## 📊 Sheet Structure

Your Google Sheet will have these columns:

| Column       | Description             |
| ------------ | ----------------------- |
| slug         | URL-friendly identifier |
| title        | Blog post title         |
| excerpt      | Short description       |
| content      | Full blog post content  |
| date         | Publication date        |
| readingTime  | Estimated reading time  |
| tags         | Comma-separated tags    |
| authorName   | Author name             |
| authorAvatar | Emoji avatar            |
| imageUrl     | Unsplash image URL      |

## 🎉 You're All Set!

Your blog posts will now be stored in Google Sheets instead of JSON files. All existing functionality works the same:

- ✅ AI-powered generation
- ✅ Automatic images
- ✅ Weekly automation
- ✅ **No post deletion** - all posts are kept!
- ✅ Easy to view and manage

## 🔧 Troubleshooting

### "GOOGLE_SHEETS_CLIENT_EMAIL is not configured"

- Add the `GOOGLE_SHEETS_CLIENT_EMAIL` to `.env.local`
- Restart your dev server

### "GOOGLE_SHEETS_PRIVATE_KEY is not configured"

- Add the `GOOGLE_SHEETS_PRIVATE_KEY` to `.env.local`
- Make sure to include the `\n` characters
- Restart your dev server

### "GOOGLE_SHEETS_ID is not configured"

- Add the `GOOGLE_SHEETS_ID` to `.env.local`
- Get it from your Google Sheet URL
- Restart your dev server

### "Permission denied" or "Access denied"

- Make sure you shared the sheet with the service account email
- Give it **Editor** permissions
- Wait a few minutes for permissions to propagate

### Sheet not auto-creating headers

- Manually add headers in row 1 of your Google Sheet:
  ```
  slug | title | excerpt | content | date | readingTime | tags | authorName | authorAvatar | imageUrl
  ```

### Posts not appearing in blog

- Check browser console for errors
- Verify API is returning posts: `curl http://localhost:3000/api/posts`
- Check Google Sheet has data

## 📚 Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Service Account Guide](https://cloud.google.com/iam/docs/service-accounts)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

## 🚀 Production Deployment

For production (Vercel, etc.):

1. Add the same environment variables to your hosting platform
2. Deploy: `git push`
3. Test the `/api/generate-blog` endpoint
4. Check your Google Sheet for new posts

## 💡 Benefits Over JSON Files

| Feature       | Google Sheets      | JSON Files           |
| ------------- | ------------------ | -------------------- |
| View posts    | ✅ Easy in browser | ❌ Need to read code |
| Edit posts    | ✅ Direct in sheet | ❌ Edit JSON         |
| Scalability   | ✅ Unlimited       | ❌ File size limits  |
| Backup        | ✅ Automatic       | ⚠️ Manual          |
| Collaboration | ✅ Easy sharing    | ❌ None              |
| Storage       | ✅ Free            | ✅ Free              |

---

**You're all set!** Your blog now uses Google Sheets as a database. Enjoy unlimited posts! 🎊
