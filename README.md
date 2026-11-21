# V2 — 120-Day Software Engineering Academy

A **working, static, frontend-only** software engineering study dashboard designed for **two learners**, six focused hours each day, 120 daily lessons, projects, videos, timers and separate progress bars. Upload the site to GitHub Pages, Vercel or any static host.

For visitors upgrading an existing installation on the same site origin, V2 reads legacy local progress and cloud settings when newer V2 data does not exist. Export a backup before changing domains.

## What works out of the box

- 120 curated learning days across Java, DSA, Spring Boot, SQL, security, React, TypeScript, DevOps, cloud, AI and interviews.
- Every lesson contains six distinct study blocks totaling exactly **360 active minutes**.
- Two independent **local** learner profiles, each with separate checklists, timers, notes, quiz answers, project tracking, YouTube watch status and progress graphs.
- Embedded YouTube course players with direct YouTube fallback links.
- Daily progress bars, 120-day progress bars, elapsed study time, study streaks and phase summaries.
- Per-block focus timers. Timers **pause when you hide or close the tab**, so unattended time is not counted. The already-recorded time is stored and is available to resume when you return.
- **Persistent browser storage** (localStorage), backup export and import. Switching tabs, reloading, or closing/reopening a normal browser retains progress, unless browsing data is cleared or browser policies prevent storage.
- Working daily multiple-choice quizzes, editable learning journal, independent assignments and project milestone checkboxes.
- No npm install, build process, hosting account credentials or backend required to use the **local two-profile mode**.

> The included website is written in **vanilla JavaScript ES modules, CSS and HTML** to keep deployment genuinely zero-build. The optional master prompt separately specifies React/TypeScript if you prefer regenerating that architecture.

## Quick deployment — GitHub Pages

1. Create a GitHub repository named, for example, `v2`.
2. Upload **index.html, styles.css, app.js, course.js, cloud.js, favicon.svg** and other included project files to the repository root (not the parent `v2` folder).
3. Open your repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch** and branch **main**, folder **/(root)**. Save.
5. Open `https://YOUR_USERNAME.github.io/v2/` after GitHub Pages has published the site.
6. Share the link with your friend.

Because routing uses hash URLs (`#/dashboard`, `#/day/12`), no server-side rewrite configuration is needed. This site is truly static and requires **no GitHub Action build workflow**.

## Deploy to Vercel

1. Import your GitHub repository in Vercel.
2. Select **Framework Preset: Other**, **Build Command: None**, **Output Directory: `.`**, and root directory `.`.
3. Deploy. Hash routing works without special rewrites.

## Two-person progress: important difference

**Same browser / device:** Select `You` or `Friend` using the dropdown at the top. Each profile has its own completely independent saved progress and both appear on the Duo dashboard.

**Separate devices, without cloud sync:** Each device stores its own progress. Learners can each continue when they close their tab, but **will not automatically see the other's progress**. This is a limitation of local browser storage, not a bug.

**Separate devices, with live cloud progress:** Connect a Supabase project as described below. Each person needs a distinct verified email/password cloud account. One creates a study duo and shares the invitation code. The other joins. Progress and leaderboards then sync through the hosted database. The browser frontend remains static; Supabase is an optional external data service. This requires a Supabase account and an internet connection. Its free tier may be subject to usage quotas and future changes.

## Optional cloud sync setup (two devices)

1. Create a Supabase project: https://supabase.com/dashboard/projects
2. Open **SQL Editor** and run the full file **`supabase-setup.sql`**. This creates the teams, profiles, and day-progress tables, row-level security policies, and protected invitation functions. Run it only once on a fresh project.
3. Under **Authentication → Providers**, enable Email authentication and use appropriate email verification settings.
4. Find the project URL and **publishable key** in the Supabase project Connect/API settings. The publishable key is meant to be placed in frontend code, **never a secret or service-role key**.
5. Open the deployed website → **Settings**, paste the project URL and publishable key, and select **Save cloud configuration**.
6. Each learner creates their own account and verifies their email if requested, then signs in on their own device.
7. Learner A clicks **Create study duo** and copies the invitation code.
8. Learner B enters the code under **Join friend's invitation**.
9. Each learner records study progress on their own device. The pair leaderboard refreshes approximately every 45 seconds while a cloud account is active and the tab is visible (or manually via **Refresh teammate**).
10. Study-day data is synced to Supabase on checklist and notes changes, and when a timer is paused. Progress is also cached locally for browser resilience.

**Cloud limitations:** No automatic cloud merge of independent pre-login local profiles is performed; these remain separate local records. A cloud login loads its own account history, preventing accidental overwrite between learners. Local changes that occur while offline remain in the browser, but the current version does not offer a comprehensive offline change queue and conflict-resolution engine; after regaining internet, review and resave affected lessons. The cloud component has not been live-tested against a real Supabase project in this environment; verify your configuration with two test accounts before relying on it for important records.

## Focus time and progress rules

- Checking off all **six blocks** marks a day as complete.
- Total roadmap percentage = completed days ÷ 120 × 100.
- A study timer adds seconds **only while the page is visible and actively running**, capped by its target duration.
- Hiding/closing the tab pauses the timer; reopening shows saved elapsed time and lets you press Resume.
- Browser backups are strongly recommended; incognito browsing, cleared storage, and some browser policies can erase local data.
- Study streaks use completed day dates with the India (`Asia/Kolkata`) calendar date, not website visits.

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
