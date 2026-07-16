# The Bookplate — standalone deployment

This makes The Bookplate work as a real, independent website — no Claude.ai
required for anyone using it, and no failures caused by testing inside
Claude's mobile preview.

## What's in this folder
- `index.html` — the app itself
- `api/claude.js` — a small server-side function that calls Claude's API
  using your private key (kept hidden from users), shared by both the
  book-scanning feature and the recommendations feature
- `package.json` — tells Vercel this is a project it can deploy

## You already have accounts from The Pass — reuse them

If you still have your Anthropic and Vercel accounts from deploying The
Pass, you don't need to create new ones. You'll just make a **new**
GitHub repo and a **new** Vercel project for The Bookplate specifically —
you can reuse the same API key too, or make a fresh one, either is fine.

## Step-by-step: get it live

### 1. Get an Anthropic API key (skip if reusing your existing one)
1. Go to https://console.anthropic.com and log in
2. Go to **Settings → API Keys**
3. Click **Create Key**, name it (e.g. "the-bookplate-prod"), copy it
   somewhere safe immediately — never paste it into a chat

### 2. Create a new GitHub repository
1. Go to https://github.com and create a new empty repository
   (e.g. "the-bookplate")
2. Use **Add file → Create new file** to add each file below by
   copy-pasting the contents (this avoids the folder-upload issues from
   last time) — remember `claude.js` needs to go inside a folder typed
   as `api/claude.js` in the filename field so GitHub creates the folder
   automatically

### 3. Deploy on Vercel
1. Go to https://vercel.com, click **Add New → Project**
2. Import the new repository you just created
3. Before clicking Deploy, expand **Environment Variables**:
   - Name: `ANTHROPIC_API_KEY`
   - Value: (your key from step 1)
4. Click **Deploy**

### 4. Test it
Open your new `.vercel.app` link on your phone in a normal browser
(Safari or Chrome, not the Claude app) and try scanning a book. It
should now work reliably, since this is a real website with its own
working connection to the AI — no more "Network issue reaching the AI
service" errors caused by the Claude app preview.

## Notes
- Favorites and history are still saved per-device (in each visitor's own
  browser), same as before.
- Keep your API key private — it only ever lives in `api/claude.js`,
  which runs on Vercel's servers, never in the browser.
- Once this is live, this is the link to actually send to real readers
  for testing — not the Claude.ai preview link.
