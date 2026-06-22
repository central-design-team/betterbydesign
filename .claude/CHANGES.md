# Changes Log

## 2026-06-22 — Feedback page OG metadata and IDI share card

- Feedback page description updated to remove live conference language
- IDI share card (images/share-cards/idi-sharecard.png) wired up as OG and Twitter image for /feedback

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
