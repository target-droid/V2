# V2 — Study Together

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

## IMPORTANT: Fix the `public.profiles` schema-cache error first

If you see **Could not find the table `public.profiles` in the schema cache**, the Supabase project configured in the website is missing a required table (or the API schema cache is stale). The previous `supabase-upgrade.sql` assumed a full initial setup had already been run. **That assumption has been fixed.**

**One-step repair, works for new and existing V2 projects:**

1. Open https://supabase.com/dashboard and select the exact project whose URL you entered in V2 Settings. Do **not** create a second Supabase project unless you plan to use it for both accounts.
2. Open **SQL Editor → New query**.
3. Open the provided **`supabase-repair.sql`** file, copy its **entire contents**, paste into SQL Editor, and click **Run**. Do not run only the last query or the old upgrade file.
4. The result should list `profiles`, `teams`, `day_progress`, `learner_meta`, with `exists_in_public = true` for each.
5. In **Project Settings → Data API**, ensure the API is enabled and `public` is among the exposed schemas (Supabase default). The script requests a schema-cache refresh.
6. Return to the deployed V2 page, hard-refresh, sign in and click **Check cloud setup** in Settings. Then **Start studying together**.

The repair script uses `CREATE TABLE IF NOT EXISTS`, adds missing columns, recreates required policies/functions, and backfills missing profiles from existing Supabase Auth accounts. It **does not delete old progress or user accounts**. For important cloud data, export a database backup before running a migration. If the four tables already exist, the issue may instead be an inaccessible schema, wrong project URL/key, or stale API cache.

## Make progress visible on both devices

1. In V2 → **Settings**, enter the **same Supabase Project URL and publishable key** on both devices, then click **Save cloud configuration**. Never use a secret or service-role key.
2. Select the correct learner name on each device. Register with **separate email/password accounts** in the same Supabase project. Confirm emails if your project requires it.
3. Sign in, verify that **Check cloud setup** succeeds. Praveen clicks **Start studying together** and shares the invitation code privately. Sanchita enters it in **Join study pair**.
4. Open **Study Together** on both devices. Praveen and Sanchita can see each other's completed lessons and individual progress; common achievements count as complete only after both tick the same block.
5. Shared data refreshes around every 15 seconds while the page is open and visible, or via **Refresh shared progress**. Each learner can edit only their own work.

**Important limitations:** GitHub Pages / Vercel host the frontend. Browser-local data does not sync across devices by itself. The separate cloud accounts must be connected to the *same* project. The app does not support live joint video calls. If offline changes conflict across multiple devices, latest-write resolution may require review.

## Project files

| File | Purpose |
|---|---|
| `index.html`, `styles.css`, `favicon.svg` | Site shell and styling |
| `app.js`, `course.js` | Dashboard, daily content, progress, quiz and timer logic |
| `cloud.js`, `cloud-config.js` | Optional Supabase connectivity |
| `supabase-repair.sql` | **Recommended** one-step setup and existing-project repair |
| `supabase-setup.sql`, `supabase-upgrade.sql` | Identical idempotent setup/repair for backward compatibility |
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
