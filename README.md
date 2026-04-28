# Jolene's Portfolio Website

A polished, professional portfolio website built with **Next.js**, **TypeScript**, and **Tailwind CSS**, designed to be deployed on **Vercel**. Contact form submissions are stored directly in **Google Sheets**.

---

## Table of Contents

1. [What This Project Is](#1-what-this-project-is)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started (Running Locally)](#4-getting-started-running-locally)
5. [How to Edit Jolene's Content](#5-how-to-edit-jolenes-content)
6. [Adding Portfolio Projects](#6-adding-portfolio-projects)
7. [Adding Videos](#7-adding-videos)
8. [Adding the CV PDF](#8-adding-the-cv-pdf)
9. [Setting Up Google Sheets](#9-setting-up-google-sheets)
10. [Setting Up the .env.local File](#10-setting-up-the-envlocal-file)
11. [Deploying to Vercel](#11-deploying-to-vercel)
12. [Common Beginner Mistakes](#12-common-beginner-mistakes)

---

## 1. What This Project Is

This is Jolene's online portfolio — a single-page website that scrolls through these sections:

| Section | Purpose |
|---|---|
| **Hero** | First impression — name, title, photo, CTA buttons |
| **About** | Bio, skills, focus areas |
| **Portfolio** | Filterable grid of design, video, and branding projects |
| **CV** | Education, experience, skills, and a CV download button |
| **Contact** | Form that saves responses to Google Sheets |

The site meets the university assignment requirements: **About, Portfolio, CV, Contact** are all included.

---

## 2. Tech Stack

| Tool | What it does |
|---|---|
| **Next.js 14** | The main framework — handles both the frontend UI and the backend API |
| **TypeScript** | Typed JavaScript — catches errors before they happen |
| **Tailwind CSS** | Utility-first CSS — styles the entire site |
| **Google Sheets API** | Stores contact form submissions in a spreadsheet |
| **Lucide React** | Icons |
| **Vercel** | Hosting platform — deploys straight from GitHub |

---

## 3. Project Structure

```
jolene-portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts       ← Backend: handles form submission
│   ├── globals.css            ← Global styles, fonts, animations
│   ├── layout.tsx             ← Root layout (SEO metadata goes here)
│   └── page.tsx               ← Main page — pulls all sections together
│
├── components/
│   ├── Navbar.tsx             ← Sticky navigation bar
│   ├── Hero.tsx               ← Hero / intro section
│   ├── About.tsx              ← About me section
│   ├── Portfolio.tsx          ← Portfolio grid with filters
│   ├── ProjectCard.tsx        ← Individual project card
│   ├── CV.tsx                 ← CV / qualifications section
│   ├── Contact.tsx            ← Contact form
│   └── Footer.tsx             ← Footer
│
├── data/
│   └── projects.ts            ← ✏️ EDIT THIS to add/update projects
│
├── lib/
│   └── googleSheets.ts        ← Google Sheets API connection (don't edit)
│
├── public/
│   ├── jolene-cv.pdf          ← ⬆️ PLACE Jolene's actual CV here
│   └── images/
│       └── (add photos here)  ← ⬆️ PLACE profile and project photos here
│
├── .env.example               ← Template for environment variables
├── .env.local                 ← ⚠️ YOU MUST CREATE THIS (see step 10)
└── package.json
```

---

## 4. Getting Started (Running Locally)

### Step 1: Install Node.js

If you haven't already, download and install Node.js from [nodejs.org](https://nodejs.org). Choose the **LTS** version. Node.js is required to run the development server.

### Step 2: Open a Terminal

- **Mac**: Press `Cmd + Space`, type "Terminal", press Enter
- **Windows**: Press `Win + R`, type "cmd", press Enter (or use VS Code's terminal)

### Step 3: Navigate to the project folder

```bash
cd path/to/jolene-portfolio
```

*Replace `path/to/jolene-portfolio` with the actual folder location.*

### Step 4: Install dependencies

```bash
npm install
```

This downloads all the libraries the project needs. It may take a minute.

### Step 5: Create your environment file

```bash
cp .env.example .env.local
```

This creates `.env.local` from the template. You'll fill in the Google Sheets credentials in [Step 10](#10-setting-up-the-envlocal-file).

**Without Google Sheets set up, the contact form will show an error.** That's fine for local testing — the rest of the site will work normally.

### Step 6: Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the site!

---

## 5. How to Edit Jolene's Content

### Changing text in the Hero section

Open `components/Hero.tsx` and look for the comments that say `UPDATE:` or `TODO:`.

Key things to change:
- Her creative title: `"Design Student & Visual Storyteller"`
- Her tagline: `"Creating work that communicates clearly…"`
- Social media links (find `href="#"` and replace `#` with real URLs)

### Changing the About bio

Open `components/About.tsx`. Find the `<p>` tags inside the "Bio paragraphs" section and replace the placeholder text with Jolene's real bio.

Also update:
- **Stats**: "3+ Years Designing", "15+ Projects", "2025" graduation
- **Skills array**: At the top of the file, edit the `skills` array
- **Focus areas**: Edit the `focusAreas` array

### Changing CV content

Open `components/CV.tsx`. Near the top of the file, edit these arrays:
- `education` — her qualifications
- `experience` — work history / internships
- `softwareTools` — software she knows
- `designSkills` — her design skills
- `achievements` — awards or recognition

### Changing site SEO / browser title

Open `app/layout.tsx`. Edit the `metadata` object:
- `title` — shows in the browser tab and Google search
- `description` — shows in Google search results

### Changing colours

Open `tailwind.config.ts`. Under `colors`, you can change:
- `terracotta` — the dusty pink/orange accent colour
- `sage` — the green accent
- `cream` — the background colour

---

## 6. Adding Portfolio Projects

Open `data/projects.ts`. This is where all project data lives.

To add a new project, add a new object to the `projects` array. Copy one of the existing ones and change the values:

```typescript
{
  id: "project-7",                      // Must be unique — just increment the number
  title: "My New Project",
  category: "Design",                    // Must match one of the allowed categories
  description: "Short summary shown on the card.",
  thumbnailUrl: "/images/my-project.jpg", // Put image in /public/images/ first
  videoUrl: undefined,                    // Or: "https://www.youtube.com/embed/VIDEO_ID"
  tools: ["Photoshop", "Illustrator"],
  year: "2024",
  role: "Designer",
  featured: false,
}
```

**Allowed categories:** `"Design"` | `"Video"` | `"Branding"` | `"Social Media"` | `"University Work"` | `"Personal Project"`

### Adding project images

1. Save your image file (JPEG or PNG, ideally around 800×600px)
2. Place it in the `public/images/` folder
3. In `projects.ts`, set `thumbnailUrl: "/images/your-filename.jpg"`

---

## 7. Adding Videos

Videos are embedded from YouTube or Vimeo — **don't upload video files directly** to the project.

### Step 1: Upload your video to YouTube

Go to [youtube.com](https://youtube.com), upload your video. You can set it to **Unlisted** so it doesn't appear publicly on your channel, but can still be embedded.

### Step 2: Get the embed URL

1. Go to your video on YouTube
2. Click **Share** → **Embed**
3. In the iframe code, find the `src="..."` URL. It looks like:
   `https://www.youtube.com/embed/ABC123xyz`
4. Copy just that URL

### Step 3: Add it to your project

In `data/projects.ts`, find your video project and set:

```typescript
videoUrl: "https://www.youtube.com/embed/ABC123xyz",
```

A "Watch Video" button will now appear on that project card.

---

## 8. Adding the CV PDF

1. Export Jolene's CV as a PDF from Canva, Word, Google Docs, etc.
2. Rename the file to `jolene-cv.pdf`
3. Place it in the `public/` folder at: `public/jolene-cv.pdf`

That's it! The "Download CV" buttons already point to `/jolene-cv.pdf`.

---

## 9. Setting Up Google Sheets

This lets the contact form save submissions to a Google Sheet.

### Step 1: Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new sheet
2. In Row 1, add these headers exactly:

```
Timestamp | Name | Email | Subject | Inquiry Type | Message
```

(One word per cell across columns A through F)

3. Copy the Sheet's ID from the URL:
   `https://docs.google.com/spreadsheets/d/` **`THIS_IS_THE_ID`** `/edit`

### Step 2: Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click the project dropdown (top left) → **New Project**
3. Give it a name like "Jolene Portfolio" → Create

### Step 3: Enable the Google Sheets API

1. In Google Cloud Console, search for "Google Sheets API"
2. Click it → **Enable**

### Step 4: Create a Service Account

A service account is like a "robot user" that can write to your sheet.

1. Go to **IAM & Admin** → **Service Accounts** in the left menu
2. Click **Create Service Account**
3. Name it something like `portfolio-contact-form`
4. Click **Create and Continue**
5. For Role, select **Editor** → Continue → Done

### Step 5: Get the JSON Key

1. Click on your new service account in the list
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key** → **JSON**
4. This downloads a `.json` file — **keep this private, never share it**

### Step 6: Share the Sheet with the service account

1. Open the JSON key file in a text editor
2. Find the `"client_email"` value — it looks like `portfolio-contact-form@your-project.iam.gserviceaccount.com`
3. Go back to your Google Sheet
4. Click **Share** (top right)
5. Paste the service account email and give it **Editor** access → Share

---

## 10. Setting Up the .env.local File

Open the `.env.local` file you created in Step 5 of "Getting Started".

Fill in the three values:

```env
# From the JSON key file — "client_email" field
GOOGLE_SHEETS_CLIENT_EMAIL=portfolio-contact-form@your-project.iam.gserviceaccount.com

# From the JSON key file — "private_key" field
# Copy the ENTIRE private key including the -----BEGIN----- and -----END----- lines
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEo...(long key)...\n-----END RSA PRIVATE KEY-----\n"

# The ID from your Google Sheet URL
GOOGLE_SHEETS_SPREADSHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
```

**Important notes:**
- The private key must be wrapped in double quotes `"..."` in `.env.local`
- The newlines inside the key become `\n` characters — that's correct
- Never commit `.env.local` to GitHub (it's in `.gitignore` already)

Restart the dev server after editing `.env.local`:

```bash
# Press Ctrl+C to stop, then:
npm run dev
```

---

## 11. Deploying to Vercel

### Step 1: Push to GitHub

1. Create a GitHub account at [github.com](https://github.com) if you don't have one
2. Create a new repository (click the `+` icon → New repository)
3. Name it `jolene-portfolio`, keep it Private
4. Follow GitHub's instructions to push your local project

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/jolene-portfolio.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project**
3. Select your `jolene-portfolio` repository
4. Click **Deploy** — Vercel will auto-detect it's a Next.js project

### Step 3: Add Environment Variables to Vercel

The contact form won't work on Vercel without the environment variables.

1. After deploying, go to your project in Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add these three variables (copy the values from your `.env.local`):
   - `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `GOOGLE_SHEETS_PRIVATE_KEY`
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
4. Click **Save**
5. Go to **Deployments** → click the three dots on the latest deployment → **Redeploy**

Your site is now live!

---

## 12. Common Beginner Mistakes

| Mistake | Fix |
|---|---|
| `npm run dev` gives "command not found" | Install Node.js from nodejs.org first |
| Site looks unstyled | Run `npm install` again — Tailwind might not be installed |
| Contact form gives 500 error | Check your `.env.local` — the Google credentials might be wrong |
| Images don't show | Make sure image files are in `public/images/` and the path starts with `/images/` |
| CV download doesn't work | Add `jolene-cv.pdf` to the `public/` folder |
| Private key error in Google Sheets | Make sure the private key in `.env.local` is wrapped in double quotes |
| Changes not showing on Vercel | Push to GitHub — Vercel auto-deploys on every push |
| `Module not found` error | Run `npm install` to install all dependencies |
| Google Sheet not receiving submissions | Check that you shared the Sheet with the service account email |

---

## Quick Reference: Files to Edit

| To change... | Edit this file |
|---|---|
| Portfolio projects | `data/projects.ts` |
| Hero text & photo | `components/Hero.tsx` |
| About bio & skills | `components/About.tsx` |
| CV content | `components/CV.tsx` |
| Contact email & socials | `components/Contact.tsx` |
| Site title & SEO | `app/layout.tsx` |
| Colours | `tailwind.config.ts` |
| Navigation links | `components/Navbar.tsx` |
| Footer | `components/Footer.tsx` |

---

*Built for Jolene's design portfolio assignment. Next.js 14 · TypeScript · Tailwind CSS · Google Sheets · Vercel.*
