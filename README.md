# V2 — Praveen & Sanchita | Study Together

A **collaborative**, not competitive, 120-day software engineering learning website. Praveen and Sanchita follow the same daily roadmap, can choose a **shared study day**, and see separate completion bars, history, quiz results, project statuses, and joint completion. There are **no points, ranks, winners, or leaderboards**.

## What works immediately

- Static HTML/CSS/JavaScript site; works on GitHub Pages or Vercel without a build command.
- 120 days × 6 study blocks = 720 blocks per learner (360 active study minutes/day).
- **Individual bars** advance with every block; **Together** progress advances only when both learners complete the same block.
- Select a common day from the **Study Together** page, then both open that lesson.
- Individual timers, notes, quizzes, milestones, and project links.
- Closing the tab saves finished blocks and timer duration in the **same browser**, and pauses the timer. Nothing counts as study time while the tab is closed.
- Export/import local JSON backups in Settings.

## Update the existing GitHub Pages website

1. **Before updating**, open your old V2 website → **Settings → Export all local data** to back up both progress histories. Existing storage key `v2_v3` is retained for migration.
2. Extract this ZIP. Open the `V2` folder. In your existing GitHub `V2` repository, upload the **contents of that folder** to the repository **root**, replacing matching files. Do not upload an extra nested `V2` folder.
3. In **Settings → Pages**, use source *Deploy from a branch*, branch `main`, folder `/(root)` (if not already enabled).
4. After GitHub completes deployment, hard refresh (`Ctrl+Shift+R`). Example address: `https://pavu1234.github.io/V2/`.
5. Open **Study Together**, choose a day, click **Set as our shared lesson**, and start studying. With two local profiles, each can tick their own boxes on the same browser.

## Make it work across your two separate devices

GitHub Pages / Vercel are static hosts and **cannot synchronize localStorage across phones or computers**. For Praveen and Sanchita to see each other's changes, configure **one Supabase project**:

1. Create a Supabase project at https://supabase.com/dashboard.
2. Open SQL Editor. For a new project run the entire `supabase-setup.sql` file. **If you already ran the older V2 Supabase setup**, run `supabase-upgrade.sql` instead to add the `study_day` field and sharing function without resetting existing data. Do not run the fresh schema over an existing production project without inspecting the changes.
3. In V2 → **Settings**, enter the same Supabase project URL and **publishable key** on both devices, then click **Save cloud configuration**. Never put the Supabase secret/service-role key in a web page.
4. Each learner picks **Who is using this device?** (`Praveen` on Praveen's device, `Sanchita` on hers), creates their **own email/password account**, confirms email if required, then signs in.
5. One person clicks **Create study duo**. Share the invitation code privately. The other person enters the code under **Join friend's invitation** and clicks **Join duo**.
6. Both open **Study Together**. Either member can select a shared day. That choice synchronizes on the next refresh; the other person's checklist is read-only. Your own completion stays editable.
7. Partner progress and shared day are polled about every **15 seconds while the website is open and visible**. Click **Refresh shared progress** to update manually. This is not live synchronized video playback or a voice call: each learner watches the same lesson on their own device.

**Important:** Cloud updates need an active internet connection. Local changes are saved in the browser. If an update fails while offline, the current prototype does not guarantee automatic eventual cloud synchronization; reopen Settings → **Restore / sync my data** and verify your partner sees the changes. Conflicting edits across devices are not fully conflict-proof.

**Cloud security:** Supabase Auth identifies each learner, Row Level Security protects individual lesson records, and invitation joining links only two accounts. Members can read each other's learning completion but cannot edit each other's work. This implementation hasn't been independently verified against your real Supabase project; test it with both accounts before relying on it.

## Project files

| File | Purpose |
|---|---|
| `index.html`, `styles.css`, `favicon.svg` | Site shell and styling |
| `app.js`, `course.js` | Dashboard, daily content, progress, quiz and timer logic |
| `cloud.js`, `cloud-config.js` | Optional Supabase connectivity |
| `supabase-setup.sql` | New project schema and security rules |
| `supabase-upgrade.sql` | Upgrade an existing V2 cloud project |
| `tests.mjs`, `together-tests.mjs` | Curriculum and collaborative feature tests (run using Node.js) |
| `MASTER_PROMPT.md` | Full instructions for generating a React/TypeScript version |

## Troubleshooting

- **Progress bar appears at 0%:** Complete at least one study block checkbox (not just the timer). Each checkbox increases that person's percentage by roughly 0.1%. The joint bar moves only after **both** finish the same block.
- **You don't see your friend's activity:** Two profiles on a single browser do not sync to another device. Both people need **separate cloud accounts connected to the same Supabase duo**.
- **Shared day won't update:** Ensure the latest SQL setup/upgrade was run and the accounts are linked.
- **Progress missing after an update:** Check that you used the same URL and browser profile, then use the JSON backup exported before updating.
- **Video won't embed:** Use **Open on YouTube**. Some creators restrict embedded playback.

## Test locally (optional)

With Node.js installed, from inside the `V2` folder:

```bash
node tests.mjs
node together-tests.mjs
```

This edition is a static site with optional cloud data synchronization. It is not a backend-powered virtual classroom with real-time audio/video chat.
