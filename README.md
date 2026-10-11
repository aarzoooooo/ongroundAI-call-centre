# On-Ground.ai Call Centre App

A rebuild of the On-Ground.ai call centre agent app, made for the Engineering Intern assignment.
It is the app an agent keeps open through a shift: dashboard, call plan, calendar and the Pulse team chat.

**Author:** Bar Shaik Aarzoo Nuha

**Live link:** `https://onground-ai-call-centre.vercel.app`

**Screen recording (2 min):** `<add link>`

---

## Run it

Requires Node 18+.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run lint
```

No backend and no environment variables. All data is sample data in `src/data/` and inside a few components.

## Stack and why

| Choice | Why |
| --- | --- |
| **React 19 + Vite** | The preferred stack. Vite gives a fast dev loop and a one-command build. |
| **React Router** | Each screen has a real URL (`/calls-to-make`, `/pulse/callcentre-team`), so refresh and the back button work as expected. |
| **Plain CSS, one file per area** | No UI kit, so the look matches the mock closely and I control every size. Type sizes are kept small, like the mock. |
| **Local JS modules for data** | The brief says no backend. Modules in `src/data/` are easy to swap for an API later. |
| **Hand-drawn SVG charts** | The dashboard charts and the OG Score radar are small SVG components. I did not add a chart library. |

## What is done

**Must build**
- App shell: sidebar and top bar
- Dashboard: KPI cards, progress, who is waiting, earnings, task list, 7-day charts
- Plan: Calls to make (ranked by score, expandable rows, paging), Incoming (missed calls with value at stake) and Recent (opens a review of the call)
- Calendar: month grid with event dots, Today button and month switcher
- Pulse home and channel chat
- Leads modal with ICP score, lead intent score, collapsible buying signals and next/previous paging

**Bonus**
- Send a message in a channel
- Answer the "Needs your input" card (buttons and reply box)
- Practise a call and Call back, using a live-call overlay
- OG Score modal with radar chart, a "Practise these 2 skills" button that opens `#avani-coaching`, and an "Announce this on LinkedIn" flow
- Date-range sheet, notifications, rank modal, settings and avatar pages
- Demo strip with In-app call and Phone call buttons

## Project layout

```
src/
  App.jsx            routes, dashboard, leads modal
  components/        PlanPages, CalendarPage, LiveCall, ScoreModal, RankModal, ...
  pages/             PulseHome, PulseChannel, AgentChannel, Settings, Notifications, Avatar
  data/              pulse, agents, notifications, personas, rank
  utils/             date range helpers
```

## Not done or known limits

- **No tests.** I checked behaviour by clicking through the screens.
- **No chart library.** The charts are hand-written SVG.
- **Mobile is partial.** There are some responsive rules, but the layouts were tuned for a laptop in Chrome first.
- **All data is fake.** Calls, messages, LinkedIn posting and the live call do not touch any service.
-  **Some code needs cleaning.** `src/OtherPages.jsx` is an older file that now only serves the Practise page and the 404 page, and it repeats lead data that also lives elsewhere. With more time I would split Practise into its own component and move all leads into one data file.

## AI tools used

I used **Claude** and **ChatGPT** while building this: for scaffolding components, matching the mock's CSS, debugging, and reviewing the project before submitting. Claude also helped write this README. I read and edited the output and can explain any part of the code.

## Git

The project was built locally and pushed to GitHub at submission time, followed by small cleanup commits.
