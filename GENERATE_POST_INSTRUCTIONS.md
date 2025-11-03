# 🚀 How to Generate Blog Posts

Since PowerShell has issues with JSON in curl commands, here are the easiest ways to generate blog posts:

## Method 1: Use the Batch Script (Easiest)

Create and run `test-api.bat`:

```bash
test-api.bat
```

This will generate a test blog post.

## Method 2: Use a JSON File

1. Create `test.json` in your project root:
```json
{
  "topic": "Your Blog Topic Here",
  "category": "programming"
}
```

2. Run:
```bash
curl.exe -X POST http://localhost:3000/api/generate-blog -H "Content-Type: application/json" -d @test.json
```

## Method 3: Use Node.js Script

1. Edit the topic in `test-blog-api.js`

2. Run:
```bash
node test-blog-api.js
```

## Method 4: PowerShell Workaround

If you want to use PowerShell, escape the quotes properly:

```powershell
$body = '{\"topic\": \"Your Topic\", \"category\": \"programming\"}'
curl.exe -X POST http://localhost:3000/api/generate-blog -H "Content-Type: application/json" -d $body
```

## Method 5: Use a REST Client

Use tools like:
- **Postman** - Download from postman.com
- **Insomnia** - Download from insomnia.rest
- **Thunder Client** (VS Code extension)

**Request:**
- Method: POST
- URL: http://localhost:3000/api/generate-blog
- Headers: Content-Type: application/json
- Body:
```json
{
  "topic": "Your Topic Here",
  "category": "programming"
}
```

## Available Categories

- `"programming"` - Programming topics
- `"cybersecurity"` - Cybersecurity topics

## Expected Response

```json
{
  "success": true,
  "post": {
    "slug": "...",
    "title": "...",
    "excerpt": "...",
    "content": "...",
    "date": "2025-01-01",
    "readingTime": 8,
    "tags": ["tag1", "tag2"],
    "author": {
      "name": "Mishab",
      "avatar": "🧙‍♂️"
    },
    "imageUrl": "https://..."
  },
  "message": "Blog post generated and saved to Google Sheets successfully"
}
```

## View Generated Posts

1. **On your blog**: http://localhost:3000/blog
2. **In Google Sheets**: https://docs.google.com/spreadsheets/d/1iGmFQCSKdGpn2lIkTE_immeRdO1CKyhRCavw6EDFfvY/edit

---

**Recommended:** Use Method 1 (batch script) or Method 2 (JSON file) for the easiest testing! 🎯

