# Quick Start Guide

Get your portfolio up and running in 5 minutes.

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Environment Variables

Create a `.env.local` file:

```env
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=your_github_username
GITHUB_TOPIC=mobile-app
```

## 3. Customize Your Info

Edit `app/page.tsx` and update:

```typescript
const CONFIG = {
  name: 'Your Name',           // ← Change this
  tagline: 'Mobile App Developer', // ← Change this
  // ...
}
```

## 4. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 5. Tag Your Repositories

For each repo you want to show:

1. Go to repo → Settings → About
2. Add topic: `mobile-app`
3. Make sure repo is public and not archived

## 6. Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

See `DEPLOYMENT.md` for detailed instructions.

---

**That's it!** Your portfolio will automatically update when you add new repos tagged with `mobile-app`.

