# Better By Design

**Public Service Design — Conference & Showcase**

A Shared Island event delivered by the Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation in partnership with Creative Ireland, and hosted by the Institute of Designers Ireland.

---

## About

Better By Design 2026 is Ireland's national public service design conference. Three years on from the launch of Ireland's Action Plan for Designing Better Public Services, the conference takes stock of what has been achieved and looks ahead — bringing together practitioners, researchers and leaders from across the Irish public service and beyond to share what's working, where the challenges are, and how we keep building.

Tickets: https://www.eventbrite.com/e/better-by-design-tickets-1988012336414

---

## Agenda

| Time  | Session |
|-------|---------|
| 08:30 | Registration — Tea, coffee and breakfast |
| 09:30 | Welcome — Charlotte Barker & Tania Banotti |
| 09:40 | Opening Address — Jack Chambers TD |
| 09:55 | Ministerial Welcome — Patrick O'Donovan TD |
| 10:15 | Keynote — Trevor Vaugh |
| 10:50 | Panel: Designing Digital — Digital and Innovation at Scale |
| 11:30 | Break |
| 12:00 | Keynote — Ben Holliday |
| 12:30 | Panel: Designing How We Work — Workforce and Organisation of the Future |
| 13:10 | Lunch |
| 14:10 | Keynote — Professor Sabine Junginger |
| 14:45 | Panel: Designing with Evidence — Evidence-Informed Policies and Services |
| 15:30 | Closing Remarks — Frank Feighan TD |

### Panels

**Designing Digital** — Digital and Innovation at Scale
Moderated by Angela Denning (Courts Service)
Speakers: Aidan O'Boyle, Alison Boland, Dan Eames, Kevin Horan, John McKeon

**Designing How We Work** — Workforce and Organisation of the Future
Moderated by Marianne Cassidy (DPER)
Speakers: Dr Caoimhe Mc Mahon, Malcolm Beattie, Jared Gormly, Lynne Whelan, Brenda Murphy

**Designing with Evidence** — Evidence-Informed Policies and Services
Moderated by Tomás Ó Ruairc (Department of Education and Youth)
Speakers: Shawna Coxon, Professor Sabine Junginger, Dr Rachael Singleton, Damian Cranney

---

## Themes

1. **Principles to Practice** — Guidelines for Designing for Public Value
2. **Designing Digital** — Digital & Innovation at Scale
3. **Designing How We Work** — Workforce & Organisation of the Future
4. **Designing with Evidence** — Evidence-Informed Policies and Services

---

## Keynote Speakers

**Trevor Vaugh** — Public Sector Design Lead, DPER
Led the development of Ireland's Government Design Principles and the Action Plan for Designing Better Public Services.

**Ben Holliday** — Chief Design Officer, TPXimpact
Over 25 years' experience supporting the transformation of organisations and public services. Previously at DWP and GDS.

**Professor Sabine Junginger** — Professor of Design & Vice Chancellor's Fellow, Northumbria University
Research focuses on human-centred design in government, policy making and implementation.

---

## Panellists

- Charlotte Barker — Chief Executive, The Institute of Designers in Ireland
- Tania Banotti — Director, Creative Ireland
- Aidan O'Boyle — Public Service Transformation Design Lead for Life Events, DPER
- Alison Boland — Head of Digital Transformation, Department of Housing, Local Government and Heritage
- Kevin Horan — Head of Design, HSE Communications and Public Affairs
- Dan Eames — Senior Digital Design Advisor, Centre for Excellence in Universal Design, NDA
- Marianne Cassidy — Assistant Secretary, DPER
- Shawna Coxon — Deputy Commissioner, Policing Operations, An Garda Síochána
- Dr Rachael Singleton — Behavioural Science Lecturer, Ulster University
- Damian Cranney — Chief Executive, Big Motive
- Tomás Ó Ruairc — Assistant Secretary, Department of Education and Youth
- Brenda Murphy — City Innovation Broker, Belfast City Council
- Jared Gormly — Head of HSE Spark Innovation Programme, HSE Spark
- Lynne Whelan — Senior Change Management Professional, SETU
- Malcolm Beattie — Former Head of Northern Ireland Innovation Lab
- Dr Caoimhe Mc Mahon — Programme Lead, MA and Professional Diploma in Service Design, NCAD

---

## Partners & Supporters

A Shared Island event delivered by the Department of Public Expenditure, Infrastructure, Public Service Reform and Digitalisation in partnership with Creative Ireland, and hosted by the Institute of Designers Ireland.

- Government of Ireland
- Shared Island Initiative
- Creative Ireland Programme
- Better Public Services
- Institute of Designers Ireland

---

## Development

Built with Next.js (static export), deployed to GitHub Pages and served via custom domain at [betterbydesign.ie](https://betterbydesign.ie).

### Setup

```bash
npm install
npm run dev        # http://localhost:3000
```

### Build

```bash
npm run build      # output goes to out/
```

To preview the static export locally:

```bash
npx serve out/
```

### Image handling

All images live in `public/images/`. Because `next/image` with `unoptimized: true` and `output: 'export'` does not apply `basePath` to image URLs, all image `src` attributes are wrapped with the `img()` helper from `lib/img.ts`, which prefixes the path with `NEXT_PUBLIC_BASE_PATH` at build time.

---

## Updating content for next year

All editable content lives in one file: **`content/site.ts`**. No changes to components are needed for routine updates.

### 1. Event details

At the top of `content/site.ts`:

```ts
export const event = {
  name: 'Better By Design',
  year: '2027',                               // update year
  date: 'Thursday 19 June 2027',              // update date
  location: 'The Lighthouse, Dublin',         // update if venue changes
  ticketsUrl: 'https://...',                  // new Eventbrite URL

  liveStreamUrl: 'https://www.youtube.com/embed/XXXXXXXXX', // new YouTube embed URL
  liveStartText: '9:30am, Thursday 19 June',  // displayed on the live page
  liveStartTime: '2027-06-19T09:30:00+01:00', // ISO 8601 — controls when dot appears
  liveEndTime:   '2027-06-19T18:00:00+01:00', // ISO 8601 — after this, link says "Watch Recording"

  isLive: false, // set to true on the morning of the event only
}
```

The "Watch Live" / "Watch Recording" label switches automatically based on `liveEndTime` — no code changes needed after setting the dates.

### 2. Speakers

Each speaker needs an entry in `speakerProfiles`, then appears in one of three lists:

| List | Section |
|------|---------|
| `ministers` | Ministers section |
| `keynotes` | Keynotes section |
| `panellists` | Panellists section |

**To add a speaker:**
1. Add their photo to `public/images/` (`.webp`, approx 400×500px, portrait crop)
2. Add a `speakerProfiles` entry — slug, name, role, organisation, image, bio, linkedin
3. Add them to the relevant list

Slug format: lowercase with hyphens — e.g. `jane-smith`, `dr-jane-smith`, `prof-jane-smith`

### 3. Agenda

Each agenda item needs `time`, `type`, and `title`. Panel items also take `moderator` (one slug) and `speakers` (array of slugs). Types: `registration`, `welcome`, `address`, `ministerial`, `keynote`, `panel`, `break`, `lunch`, `closing`.

### 4. Themes and descriptions

Update the `themes` array and `themesActionDescription` string.

### 5. Partners and footer

Update `partners.body`, `partnerLogos`, `footerDescription`, and `social` as needed.

---

## On the day: going live

1. Get the YouTube live embed URL (format: `https://www.youtube.com/embed/VIDEO_ID`)
2. Update `liveStreamUrl` in `content/site.ts`
3. Set `isLive: true`
4. Commit and push — site deploys in ~2 minutes

After the event: set `isLive: false` and push. The "Watch Recording" label appears automatically.

---

## Deploying to GitHub Pages

Deployment is fully automated. Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `out/` to GitHub Pages.

### First-time setup for a new repo

1. **Enable GitHub Pages:**
   - Repo Settings → Pages → Source: **GitHub Actions**

2. **Set the base path** (only if the site lives at a sub-path, e.g. `org.github.io/bbd`):
   - Repo Settings → Variables → Actions → New repository variable
   - Name: `NEXT_PUBLIC_BASE_PATH`, Value: `/bbd`
   - Leave unset if using a custom domain (the current setup uses a custom domain with no base path)

3. **Set the site password** (if password protection is active):
   - Repo Settings → Secrets and variables → Actions → New repository secret
   - Name: `SITE_PASSWORD`, Value: the password

4. **Custom domain:**
   - The `public/CNAME` file already contains `betterbydesign.ie`
   - In repo Settings → Pages, enter the custom domain and enable "Enforce HTTPS"
   - With your DNS registrar, add an `A` record pointing to GitHub Pages IPs, or a `CNAME` pointing to `<org>.github.io`

### Triggering a manual deploy

Without pushing code: Actions → Deploy to GitHub Pages → Run workflow → Run workflow

### Checking a deploy

- Progress: Actions tab → latest workflow run
- Live URL: Repo Settings → Pages
- Typical build time: 1–2 minutes
