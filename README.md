# 🧶 LoopedWithLove — Handmade Crochet Business Website

A beautiful, production-ready Next.js 14 website for a handmade crochet business. Products managed via Google Sheets + Google Forms — zero coding needed for the business owner.

---

## ✨ Features
- 🛍️ Dynamic product catalog from Google Sheets
- 🎨 Warm, artisanal design with dark mode
- 📱 Fully mobile-responsive with bottom nav
- 🔍 Search, filter & sort products
- 💝 Wishlist (localStorage)
- 🔗 Multi-platform buy links (Amazon, Flipkart, Meesho, Etsy, WhatsApp)
- ⚡ ISR with 60s revalidation
- 🔒 Password-protected admin panel
- 📊 Admin: toggle stock, update quantity, feature/hide products
- 🤖 SEO with JSON-LD structured data + auto sitemap
- 📦 PWA ready

---

## 🚀 Setup Guide

### PART 1: Google Sheets

**Step 1 — Create the Sheet**
1. Go to [sheets.google.com](https://sheets.google.com) → Click **Blank**
2. Name it **"LoopedWithLove Products"**

**Step 2 — Set Up Apps Script**
1. In the sheet → **Extensions → Apps Script**
2. Delete any existing code, paste the entire contents of `google-apps-script/Code.gs`
3. Click **Save**
4. Run `setupSheets` (select from dropdown → ▶ Run → allow permissions)
5. Edit the API key inside `setupApiKey()`, then run it
6. Run `installTrigger`

**Step 3 — Deploy as Web App**
1. Click **Deploy → New deployment**
2. Type: **Web app** | Execute as: **Me** | Access: **Anyone**
3. Click **Deploy** → copy the URL

### PART 2: Google Form

**Step 4 — Create Product Entry Form**
1. Go to [forms.google.com](https://forms.google.com) → New Form
2. Add fields: Product Name, Category (dropdown), Short Description, Full Description, Price, MRP, Primary Image URL, Amazon/Flipkart/Meesho links, Stock Status, Quantity, Material, Dimensions, Care Instructions, Tags
3. Click **Responses → Link to Sheets** → select your spreadsheet → Products sheet

### PART 3: Google Drive Images

**Step 5 — Image Hosting**
1. Create a folder in Google Drive → right-click → Share → "Anyone with the link can view"
2. Upload product photos → right-click each → "Get link"
3. Use those links in the Google Form image fields

### PART 4: Next.js Project

**Step 6 — Install**
```bash
# Make sure you have Node.js 18+ installed
npm install
```

**Step 7 — Environment Variables**
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```env
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
APPS_SCRIPT_API_KEY=your-secret-api-key-from-step-2
ADMIN_PASSWORD=choose-a-strong-password
NEXT_PUBLIC_SITE_URL=https://loopedwithlove.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-url
```

**Step 8 — Run Locally**
```bash
npm run dev
# Open http://localhost:3000
```

### PART 5: Deploy to Vercel

**Step 9 — Deploy**
1. Push code to GitHub (see steps below)
2. Go to [vercel.com](https://vercel.com) → "Add New Project" → import your repo
3. Add all environment variables from `.env.local`
4. Click **Deploy** 🚀

---

## 📤 GitHub Upload Steps

```bash
# 1. Install Git if needed: https://git-scm.com
# 2. Create a new repo on github.com (don't add README/gitignore)
# 3. In this folder, run:

git init
git add .
git commit -m "Initial commit — LoopedWithLove"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/looped-with-love.git
git push -u origin main
```

---

## 👩‍💼 How to Add Products (Non-Technical Guide)

1. Open your Google Form link (bookmark it!)
2. Fill in all the product details
3. Click **Submit**
4. ✅ Your product appears on the website within 1–2 minutes!

## 🖼️ How to Upload Images

1. Open your Google Drive folder
2. Upload your product photo
3. Right-click the file → **Get link** → set to "Anyone with the link"
4. Copy that link and paste it in the form's image field

## 🔧 How to Use the Admin Panel

1. Go to `https://yoursite.com/admin`
2. Enter your admin password
3. **Toggle stock:** Click the green/red button next to any product
4. **Update quantity:** Click + / − or type a number
5. **Best Seller:** Click 🔥 (turns orange when active)
6. **Feature a product:** Click ⭐ (appears in hero section)
7. **Hide/show:** Click 👁️
8. **Add product:** Click "Add Product" → opens your Google Form

---

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| Products not showing | Check Apps Script URL in `.env.local`. Make sure Web App is deployed with "Anyone" access. |
| Images not loading | Ensure Google Drive folder is shared publicly. Check the link format. |
| Admin not saving | Verify `APPS_SCRIPT_API_KEY` matches between `.env.local` and Apps Script properties. |
| Form submissions not appearing | Re-run `installTrigger()` in Apps Script. Check execution log for errors. |
| Site not updating | Wait 60 seconds (ISR). Or POST to `/api/revalidate?secret=YOUR_REVALIDATION_SECRET`. |

---

## 📁 Project Structure

```
looped-with-love/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── providers.tsx       # Wishlist context
│   ├── products/           # Shop + product detail
│   ├── about/              # About page
│   ├── contact/            # Contact + FAQ
│   ├── custom-orders/      # Custom orders page
│   ├── wishlist/           # Wishlist page
│   ├── admin/              # Admin panel (password protected)
│   └── api/                # API routes
├── components/
│   ├── layout/             # Header, Footer, Nav
│   ├── home/               # Home page sections
│   ├── products/           # Product cards, filters, gallery
│   ├── admin/              # Admin dashboard + table
│   ├── contact/            # Contact form + FAQ
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── api.ts              # Google Sheets API helpers
│   ├── types.ts            # TypeScript interfaces
│   ├── utils.ts            # Helper functions
│   └── constants.ts        # Sample data + categories
├── public/
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots
├── google-apps-script/
│   └── Code.gs             # Complete backend API
├── .env.example            # Environment variable template
└── README.md               # This file
```

---

Made with 💝 and yarn · LoopedWithLove
