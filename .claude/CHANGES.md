# Changes Log

## 2026-06-15 — LiveBanner restored, Watch Live in nav, start time fix

- LiveBanner restored to (site)/layout.tsx (floating bottom-right widget linking to /live)
- "Watch Live" / "Live Stream" link added to desktop nav bar and bottom of mobile menu; pulsing red dot shown when isLive
- liveStartText corrected from 10:30am to 9:30am (matches agenda Welcome at 09:30)

## 2026-06-15 — Drawer fixes, hero overflow, IDI URL

- `preventScroll: true` on AgendaDrawer/SpeakerDrawer focus() — stops page jumping to top when opening drawers
- SpeakerDrawer close button fixed for side-by-side, path-based, and standalone cases
- Hero fluid text clamp: 3rem/13.5cqw → 2rem/12cqw so text doesn't overflow on small mobile
- IDI partner logo URL updated to idi-design.ie

## 2026-06-15 — Mobile menu transition + burger icon fix

- Header.tsx mobile overlay now uses opacity fade (200ms) instead of instant mount/unmount
- Burger middle bar hides instantly when opening; fades in smoothly on close

## 2026-06-15 — Mobile menu transition + responsive footer

- Delay setMenuOpen(false) by 350ms on agenda nav click (LiveHeader.tsx)
- Footer logos right-aligned on desktop, stacked below text on mobile
