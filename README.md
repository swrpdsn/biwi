# biwi 💌

A little interactive love-letter site, made for Girlfriend Day.

## Before you deploy — 3 quick edits

Open **`script.js`** and edit the `CONFIG` block at the very top. It's the only file you need to touch for content:

1. **Your name** — set `yourName` (currently `"Your Techie"`), it signs the letter at the end.
2. **The letter** — read through the `letter` array and make it sound like you. It's a starting draft, not the final word — add your own memories, inside jokes, specifics.
3. **The song** — drop an mp3 file at `assets/audio/song.mp3` (exact filename). The music button hides itself automatically if no file is found, so the site won't break if you skip this. Only use a song you have the right to use/share.

Everything else — the meet-day photo, the quote slide photo, gallery captions — is also editable at the top of `script.js` if you want to tweak which photo goes where.

## How to deploy on GitHub Pages

1. Create a new repo called `biwi` on GitHub (public, so Pages works on the free tier).
2. Upload everything in this folder to the repo (keep the folder structure — `index.html`, `style.css`, `script.js`, and the whole `assets/` folder).
3. Go to **Settings → Pages** in the repo.
4. Under "Build and deployment", set **Source: Deploy from a branch**, branch: `main`, folder: `/ (root)`. Save.
5. Wait a minute or two — your site will be live at:
   `https://<your-github-username>.github.io/biwi/`

### Or, if you have `git` + `gh` CLI installed locally:
```bash
cd biwi-site
git init
git add .
git commit -m "happy girlfriend day"
gh repo create biwi --public --source=. --push
gh api repos/:owner/biwi/pages -X POST -f build_type=workflow -f "source[branch]=main" -f "source[path]=/" 2>/dev/null || true
```
Then enable Pages from repo Settings if the API call above doesn't do it automatically.

## What's inside

- `index.html` / `style.css` / `script.js` — the whole site, vanilla (no build step, no dependencies)
- `assets/img/` — 37 of her photos, optimized for web
- `assets/video/us.mp4` — your video, compressed for fast loading
- `assets/audio/` — put `song.mp3` here (optional)

Swipe or tap the left/right edges of the screen to move between moments — it's built like a story, not a scroll page.
