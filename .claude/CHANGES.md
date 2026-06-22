# Changes Log

## 2026-06-22 — Feedback page, watch recording auto-label, readme

- New /feedback page with Jotform embed (261723989741066), loading spinner, and correct share text
- Watch Live → Watch Recording now switches automatically after liveEndTime (no manual update needed post-event)
- getWatchLabel() helper added to content/site.ts; liveEndTime added to event config
- LiveCard updated with a third post-event state showing "Watch Recording"
- README expanded with content cheatsheet, on-the-day guide, and GitHub Pages setup instructions

## 2026-06-15 — LiveBanner restored, Watch Live in nav, start time fix

- LiveBanner restored to (site)/layout.tsx (floating bottom-right widget linking to /live)
- "Watch Live" / "Live Stream" link added to desktop nav bar and bottom of mobile menu; pulsing red dot shown when isLive
- liveStartText corrected from 10:30am to 9:30am (matches agenda Welcome at 09:30)

## 2026-06-15 — Drawer fixes, hero overflow, IDI URL

- `preventScroll: true` on AgendaDrawer/SpeakerDrawer focus() — stops page jumping to top when opening drawers
- SpeakerDrawer close button fixed for side-by-side, path-based, and standalone cases
- Hero fluid text clamp: 3rem/13.5cqw → 2rem/12cqw so text doesn't overflow on small mobile
- IDI partner logo URL updated to idi-design.ie
