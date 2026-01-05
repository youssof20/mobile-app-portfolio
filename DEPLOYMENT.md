# Deployment Instructions

This document contains the manual setup steps that you need to complete to deploy and maintain your portfolio site.

## 📋 Prerequisites Checklist

- [ ] GitHub account with public repositories
- [ ] Vercel account (free tier works)
- [ ] Node.js 18+ installed locally (for testing)

---

## 🔧 Step 1: GitHub - Topic Discipline (Critical)

For every repository you want to appear on your portfolio:

1. Go to your repository on GitHub
2. Click **Settings** → **About** (or click the gear icon ⚙️ next to "About")
3. In the **Topics** field, add: `mobile-app`
4. Press Enter to add the topic
5. Verify:
   - ✅ Repository is **public**
   - ✅ Repository is **not archived**
   - ✅ Repository is **not a fork**

**Important**: Anything without the `mobile-app` tag will never show up (by design).

### Optional: Featured Repositories

To make certain repos appear at the top of the list:

1. Add the `featured` topic to those repositories
2. They will automatically float to the top
3. This lets you control perception without manual ordering

---

## 🔑 Step 2: GitHub - Create a Read-Only Token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**
2. Click **Generate new token**
3. Configure the token:
   - **Token name**: `Portfolio Site` (or any descriptive name)
   - **Description**: `Read-only access for portfolio site`
   - **Expiration**: Choose your preference (90 days, 1 year, or no expiration)
   - **Repository access**: 
     - Select "Only select repositories" if you want to limit access
     - Or "All repositories" for simplicity
   - **Permissions**: Under "Repository permissions", select:
     - ✅ **Contents**: Read-only
     - ✅ **Metadata**: Read-only
4. Click **Generate token**
5. **Copy the token immediately** (you won't be able to see it again!)
6. Save it securely - you'll paste this into Vercel in Step 4

---

## 🚀 Step 3: Vercel - Deployment

### 3.1 Push Your Site to GitHub

If you haven't already:

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

### 3.2 Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project** (or **New Project**)
3. Import your GitHub repository:
   - Select the repository from the list
   - Or paste the repository URL
4. Configure the project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. **DO NOT** click Deploy yet - we need to add environment variables first!

### 3.3 Add Environment Variables

Before deploying, add these environment variables:

1. In the Vercel project setup page, scroll to **Environment Variables**
2. Add each variable:

   | Variable Name | Value | Description |
   |--------------|-------|-------------|
   | `GITHUB_TOKEN` | `your_token_from_step_2` | Your GitHub personal access token |
   | `GITHUB_USERNAME` | `your_github_username` | Your GitHub username (e.g., `octocat`) |
   | `GITHUB_TOPIC` | `mobile-app` | The topic tag to filter repos (optional, defaults to `mobile-app`) |

3. Click **Add** for each variable
4. Make sure all variables are set for **Production**, **Preview**, and **Development** environments

### 3.4 Deploy

1. Click **Deploy**
2. Wait for the build to complete (usually 1-2 minutes)
3. Once deployed, click **Visit** to see your live site!

---

## 🔄 Step 4: Vercel - Auto-Update (This Makes It "Forget It")

This step ensures your site automatically rebuilds when you add new repositories.

### 4.1 Create a Deploy Hook in Vercel

1. In your Vercel project, go to **Settings** → **Git**
2. Scroll down to **Deploy Hooks**
3. Click **Create Hook**
4. Configure:
   - **Name**: `GitHub Webhook` (or any name)
   - **Branch**: `main` (or your default branch)
5. Click **Create Hook**
6. **Copy the webhook URL** - you'll need this in the next step

### 4.2 Add Webhook to GitHub

1. Go to your portfolio repository on GitHub
2. Click **Settings** → **Webhooks**
3. Click **Add webhook**
4. Configure the webhook:
   - **Payload URL**: Paste your Vercel deploy hook URL
   - **Content type**: `application/json`
   - **Secret**: Leave empty (or add one if you want extra security)
   - **Which events**: Select **Just the push event**
   - ✅ **Active**: Checked
5. Click **Add webhook**

### 4.3 Test the Auto-Update

1. Make a small change to your repository (e.g., update README)
2. Push the change to GitHub
3. Check Vercel - you should see a new deployment triggered automatically

---

## ✅ You're Done!

Now your portfolio site will:

- ✅ Automatically display all public repos tagged with `mobile-app`
- ✅ Update automatically when you push changes to the portfolio repo
- ✅ Show featured repos at the top (if you add the `featured` topic)
- ✅ Require zero ongoing maintenance

### How It Works

- **New public repo + `mobile-app` tag** → Site updates on next build
- **Add `featured` topic** → Repo floats to the top
- **Push to portfolio repo** → Site rebuilds automatically (via webhook)

### Manual Rebuild (If Needed)

If you want to manually trigger a rebuild:

1. Go to Vercel → Your Project → **Deployments**
2. Click the **⋯** menu on any deployment
3. Click **Redeploy**

Or use the deploy hook URL directly:

```bash
curl -X POST YOUR_DEPLOY_HOOK_URL
```

---

## 🐛 Troubleshooting

### No repositories showing up?

1. ✅ Verify repos have the `mobile-app` topic
2. ✅ Check repos are public (not private)
3. ✅ Ensure repos are not archived or forks
4. ✅ Verify `GITHUB_TOKEN` has correct permissions
5. ✅ Check `GITHUB_USERNAME` is correct
6. ✅ Check Vercel build logs for errors

### Build fails?

1. ✅ Ensure all environment variables are set in Vercel
2. ✅ Verify GitHub token is valid and not expired
3. ✅ Check GitHub username is spelled correctly
4. ✅ Review build logs in Vercel dashboard

### Site not updating?

1. ✅ Verify webhook is active in GitHub
2. ✅ Check webhook delivery logs in GitHub
3. ✅ Ensure deploy hook URL is correct
4. ✅ Try manually triggering a rebuild in Vercel

---

## 📝 Next Steps

1. **Customize your info**: Edit `app/page.tsx` to update your name and tagline
2. **Add more repos**: Tag them with `mobile-app` and they'll appear automatically
3. **Feature your best work**: Add the `featured` topic to highlight specific apps
4. **Share your portfolio**: Your site is live and ready to share!

---

## 🔥 Optional Upgrade: Multiple Categories

If you want to add more categories later (e.g., `web-app`, `desktop-app`):

1. Create separate pages for each category
2. Update the topic filter in each page
3. Add navigation between categories
4. The code structure supports this easily!

---

**Remember**: This site is designed to be "deploy once, forget it." As long as you tag your repos correctly, everything else happens automatically! 🎉

