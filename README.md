# V2 — Praveen vs Sanchita | Two-Person Competition Edition

**Important:** This is a real static website, with separate local progress for **Praveen** and **Sanchita**, and an optional **Supabase-powered, cross-device shared competition**. GitHub Pages and Vercel host the frontend. Neither host alone can sync progress between two devices.

## First: replace the old version

1. Back up existing progress on your old V2 site (Settings → Export) before replacing files.
2. Extract the updated V2 ZIP and upload the **files inside the `V2` folder** directly to the **root** of your existing GitHub repo `V2`. Select overwrite/commit changes for files with the same name. Keep the same repository URL so previous browser progress can be detected from `localStorage`.
3. In GitHub Settings → Pages, select **Deploy from a branch → main → / (root)**. Open `https://YOUR_USERNAME.github.io/V2/` and perform a hard refresh (`Ctrl+Shift+R`) if you still see the older dashboard.
4. Open the new **🏆 Praveen vs Sanchita** page. The bars now track *every completed study block* (720 total), so the number advances after the first checkbox. Separate, larger bars also show completed days (0–120). The competition has points, progress by day, 6 individual checkboxes for each day, recent lessons, quiz completion and project scoreboard.
5. **Local mode** works without further setup but is limited to a **single browser**. To make Praveen and Sanchita see each other's real achievements on different devices, follow the next section.

## Required to share progress between two devices

**You need one Supabase project** (a cloud database), two distinct accounts, and one shared invitation code. You do NOT need to deploy a custom backend or buy a server.

1. One of you creates a new project at https://supabase.com/dashboard. Open **SQL Editor** and run the full file **`supabase-setup.sql`**. If you already ran the older V2 SQL in the same project, run **`supabase-upgrade.sql`** instead; it adds project and video metadata used by the leaderboard. New users do not need to run both scripts.
2. In Supabase → **Authentication → Providers**, ensure Email authentication is enabled. Keep email confirmation enabled and each person verifies their own email.
3. In **Project Settings → API Keys** or **Connect**, copy the project's `https://...supabase.co` URL and its **publishable key** (a public `sb_publishable_...` key). **Never use a secret or service-role key**, and never upload any passwords to GitHub.
4. Recommended: in the downloaded `cloud-config.js`, fill in the `CLOUD_URL` and `CLOUD_PUBLISHABLE_KEY` variables with those *public* values, then commit that file to your GitHub repository. This shares the same project configuration with both devices. Alternatively each learner can enter the URL and publishable key separately under V2 → **Settings**, then click Save cloud configuration.
5. **Praveen's device:** Open the hosted V2 website → Settings → "Who is using this device?" → **Praveen**. Create a cloud account with Praveen's own email/password; verify the email and then sign in. Click **Create study duo** and copy the invitation code.
6. **Sanchita's device:** Open the *same* hosted website → Settings → select **Sanchita**. Create a **different** cloud account using her own email/password, verify, and sign in. Enter the invitation code and click **Join duo**. Each person may click **Save my selected name** after login to confirm their displayed identity.
7. Open **🏆 Praveen vs Sanchita**. Each person's **own** account can edit their own lesson checks, projects, quiz scores, video statuses and timers. Their partner can view progress and milestones but cannot modify the other's record. RLS enforces this in Supabase.
8. Mark a block completed on Praveen's screen, then check Sanchita's competition page. Updates are saved to the database on change (short debounce) and **refreshed automatically about every 15 seconds** while the competition page is visible. You can click **↻ Sync teammate** for an immediate refresh. Reliable syncing requires internet access and valid Supabase settings.
9. Close and reopen the page on either device: local progress is cached in that browser and restored from the matching cloud account after login. The focus timer remains **paused**; it does not accumulate unattended study hours while the tab is closed.

### Troubleshooting

- **Two names but no shared progress:** You are still in browser-only local mode; sign in to cloud on both devices and join the same duo. Local data from one device is not automatically copied to another.
- **Cloud error `relation learner_meta does not exist`:** Run `supabase-upgrade.sql` in your previously configured Supabase project.
- **Progress bar appears at 0%:** Check at least one of the six blocks on any Day page. The blocks progress bar should then show `0.1%` (1/720); the *completed days* bar will remain at 0 until all six blocks of one day are checked.
- **Partner still says Waiting for your friend:** The second learner has not joined the invitation code, or the team link failed. Both must be logged in to their separate accounts in the **same** Supabase project.
- **Wrong name after logging in:** Select the correct name in Settings and click **Save my selected name**.
- **Already deployed before:** Use the same site URL if you want browser-local progress to stay accessible. Always export a backup before switching domains.
- **Could not save to cloud / stale leaderboard:** Check connection, valid sign-in, SQL setup, and click Sync teammate. Offline edits remain in browser until reconnected, but cross-device conflict merging is best-effort, not guaranteed.
- **GitHub Pages shows source or 404:** `index.html` must be at the root, and Pages must use `main` / `(root)`.

### Competition scoring

- Completed study block: **10 points**.
- Finished day (all six checked): **20 bonus points**.
- Correct daily quiz: **5 points**.
- Completed project: **25 points**.
- Study time is shown separately; idle minutes do not earn points. These self-reported points are for motivation, not a verified measure of skill.

### Privacy / security

- Each learner must have their own credentials; never share passwords.
- Supabase RLS restricts progress and project data to the account owner and connected partner, and only the owner can write.
- As currently implemented, the connected partner can read the full day-progress records, which include personal study notes. Do not write secrets or sensitive personal information in V2 notes.
- Use only the Supabase public/publishable key in `cloud-config.js`. Public configuration is not an authentication secret.
- Export backup JSON periodically. Account sign-ins and schema have **not been verified against a live Supabase project** in this environment; test with two real accounts after setup.

---

## Learning and project reference

## Recommended learning schedule

| Activity | Minutes |
|---|---:|
| Video lesson and active recall | 90 |
| Guided coding implementation | 90 |
| Independent assignment or project | 90 |
| Java DSA challenge | 45 |
| Quiz and debugging | 30 |
| Revision journal | 15 |
| **TOTAL** | **360 / 6 hours** |

## Project files

- `index.html` — static web page and entry point.
- `styles.css` — responsive dark-mode dashboard design.
- `app.js` — routing, two-profile persistence, UI, timers, quizzes, progress, cloud orchestration.
- `course.js` — 120 lessons, phase data, quiz bank and YouTube resource library.
- `cloud.js` — optional Supabase REST authentication and cloud sync client.
- `supabase-setup.sql` — optional secured Supabase schema and RPC functions.
- `MASTER_PROMPT.md` — long-form prompt for additional generation or expansion.
- `tests.mjs` — standalone Node.js curriculum integrity tests (`node tests.mjs`).

## Tests and verification

The JavaScript module syntax has been checked with Node.js, and `node tests.mjs` passes 120-day curriculum, eight-phase, duration, quiz and YouTube URL-format checks. Each day contains six blocks totaling 360 minutes. An automated browser rendering test could not run because the available Chromium environment blocks page navigation. You should smoke-test the deployed site and optional Supabase flow in a normal browser before treating it as production-validated.

The YouTube library references public learning resources; embedded playback is subject to the video owners' embedding policies. External links are always available.
