# GitHub Pages Deployment Guide

This guide will help you publish your recruitment website on GitHub Pages so you can share it with others for feedback.

---

## PREREQUISITES

- GitHub account (free: https://github.com)
- Git installed on your computer (check with `git --version`)

---

## STEP-BY-STEP DEPLOYMENT

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in:
   - **Repository name:** `recruitment-website` (or any name you prefer)
   - **Description:** "Recruitment website for Real-Time Focus Tracking Study"
   - **Visibility:** 
     - ✅ **Private** (recommended for testing) - Only you and people you invite can see it
     - Or **Public** (if you want it searchable)
   - ❌ **Do NOT** check "Initialize with README" (we'll push existing files)
4. Click **"Create repository"**

---

### Step 2: Initialize Git in Your Website Folder

Open terminal and run:

```bash
cd /Users/rajnishkumar/FRENZ_project_codes/recruitment_material/humanx-website-2

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Recruitment website"
```

---

### Step 3: Connect to GitHub Repository

After creating the repository on GitHub, you'll see a page with setup instructions. Use the "push an existing repository" option:

```bash
# Add GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/recruitment-website.git

# Rename branch to main (GitHub uses 'main' by default)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** You'll be prompted for your GitHub username and password (or use a Personal Access Token).

---

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** (top menu)
3. Scroll down to **"Pages"** (left sidebar)
4. Under **"Source"**, select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click **"Save"**
6. GitHub will give you a URL like: `https://YOUR_USERNAME.github.io/recruitment-website/`

---

### Step 5: Wait for Deployment

- GitHub Pages usually deploys in 1-2 minutes
- You'll see a green checkmark when it's ready
- The URL will be active and shareable

---

## SHARING YOUR WEBSITE

### Option 1: Share the GitHub Pages URL
- Share: `https://YOUR_USERNAME.github.io/recruitment-website/`
- Anyone with the link can view it
- No login required

### Option 2: Share a QR Code
- Update `SITE_URL` in `generate_qrcode 2.py` with your GitHub Pages URL
- Run the script to generate `humanx-website-2/assets/images/recruitment-qr.png`
- The recruitment page will display the QR code automatically

### Option 2: Make Repository Collaborators
- If repository is **Private**, invite specific people:
  - Repository → Settings → Collaborators → Add people
  - They'll get access to view and give feedback

---

## WHAT GETS PUBLISHED

**Files that will be on GitHub Pages:**
- ✅ `index.html` - Your main website
- ✅ `assets/` - CSS, images, videos
- ✅ `scripts/` - JavaScript files

**Files that WON'T be accessible (but that's fine):**
- ❌ `Google_Form_Consent_Setup_Guide.md` - Documentation (not needed for website)
- ❌ `Google_Form_Registration_Setup_Guide.md` - Documentation
- ❌ `Apps_Script_Automated_Email_System.gs` - Backend code (runs on Google, not GitHub)
- ❌ Other `.md` files - Documentation

**Note:** These documentation files will be in your GitHub repository (for your reference), but they won't be part of the live website, which is fine.

---

## UPDATING YOUR WEBSITE

After making changes:

```bash
cd /Users/rajnishkumar/FRENZ_project_codes/recruitment_material/humanx-website-2

# Add changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

GitHub Pages will automatically update (usually within 1-2 minutes).

---

## AUTOMATION SETUP (LATER - INDEPENDENT)

The Apps Script automation is **completely independent** of where your website is hosted:

✅ **Website on GitHub Pages** → Links to Google Forms
✅ **Google Forms** → Collect responses
✅ **Google Sheets** → Stores responses
✅ **Apps Script** → Runs automation (on Google's servers)

**The automation works regardless of where your website is hosted!**

You can set up the Apps Script:
- ✅ Before publishing on GitHub
- ✅ After publishing on GitHub
- ✅ Anytime - it doesn't matter

---

## CUSTOM DOMAIN (OPTIONAL)

If you want a custom domain later (e.g., `study.dartmouth.edu`):
- GitHub Pages supports custom domains
- Configure in: Repository → Settings → Pages → Custom domain
- Update DNS settings with your domain provider

---

## SECURITY CONSIDERATIONS

### For Testing/Feedback:
- ✅ **Private repository** is recommended
- ✅ Share GitHub Pages URL only with trusted reviewers
- ✅ Forms are already protected (require Google account or have access controls)

### Before Going Live:
- ✅ Remove testing disclaimer banner (change CSS `display: none`)
- ✅ Verify all form links work
- ✅ Test on multiple devices/browsers
- ✅ Ensure IRB approval is obtained

---

## TROUBLESHOOTING

### Website Not Loading?
- Check GitHub Pages deployment status (Settings → Pages)
- Verify files are in the `main` branch
- Check for errors in the repository

### Changes Not Showing?
- GitHub Pages can take 1-2 minutes to update
- Hard refresh browser (`Cmd+Shift+R`)
- Check if commit was pushed successfully

### Git Issues?
- Make sure you're in the correct directory
- Check `git status` to see what's changed
- Verify you're logged into GitHub

---

## QUICK REFERENCE COMMANDS

```bash
# Navigate to website folder
cd /Users/rajnishkumar/FRENZ_project_codes/recruitment_material/humanx-website-2

# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# View your website
# Open: https://YOUR_USERNAME.github.io/recruitment-website/
```

---

## NEXT STEPS

1. ✅ Deploy to GitHub Pages (follow steps above)
2. ✅ Share URL with reviewers
3. ✅ Collect feedback
4. ✅ Make updates as needed
5. ✅ Set up Apps Script automation when ready (independent step)

---

**Ready to deploy?** Follow Steps 1-4 above!

**Need help?** Let me know if you run into any issues during deployment.

