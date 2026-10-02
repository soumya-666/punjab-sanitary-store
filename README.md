# Punjab Sanitary Store — website

Showroom website for Punjab Sanitary Store, SCO 96A, D.S. Estates, Old Ambala Road, Dhakoli, Zirakpur.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

## Run it

```bash
npm install
npm run dev        # development server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Before going live

These need real information from the business. Nothing has been guessed.

1. **Site address** — copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`
   (for example `https://www.your-domain.in`). Until it is set, canonical URLs, the sitemap,
   robots.txt and structured data all point at `http://localhost:3000`.
2. **Google Maps links** — in `lib/site.ts`, fill in `maps.placeUrl` and `maps.embedUrl` with the
   links to the showroom's own Google listing. A search for the name and address currently returns
   more than one "Punjab Sanitary Store" in Zirakpur, so the fallback may not point to the right one.
3. **Phone, email, opening hours** — also in `lib/site.ts`. Each is `null` for now. Fill one in
   and the matching button, footer line, contact detail, mobile action and structured data field
   appear automatically. (The WhatsApp number is set: +91 98765 54291.)
4. **Enquiry form** — it currently delivers by WhatsApp: it opens a chat with the enquiry written
   out and the visitor presses send. To receive enquiries another way, set
   `NEXT_PUBLIC_ENQUIRY_ENDPOINT` to a form service or API route that accepts a JSON `POST`; the
   form and the privacy policy both switch over automatically (`enquiryMode` in `lib/enquiry.ts`).
5. **Privacy policy** — `app/privacy-policy/page.tsx` describes how the site works today (no
   analytics, no cookies of its own, enquiries by WhatsApp, Google Maps embedded). The owner should
   read it before launch — it makes commitments on the business's behalf — and it must be updated
   if any of that changes (for example if analytics are added).
6. **Brand name and logo** — `brand.name` in `lib/site.ts` controls how the brand is written
   everywhere (it is "Jaquar", matching the logo; the old `/jaguar` address redirects to
   `/jaquar`). `brand.authorizedDealer` switches the "Authorized Dealer of …" wording on the
   brand page.
7. **Review the copy** in `lib/categories.ts` against what is actually on display.

## Where things live

| To change…                                   | Edit                                   |
| -------------------------------------------- | -------------------------------------- |
| Name, address, contact details, brand, maps  | `lib/site.ts`                          |
| Product categories, page copy, SEO titles    | `lib/categories.ts`                    |
| Any picture or its alt text                  | `lib/images.ts` + `public/images/`     |
| Gallery contents and order                   | `lib/gallery.ts`                       |
| FAQ (page and structured data together)      | `lib/faqs.ts`                          |
| Colours, type scale, motion timing           | `styles/globals.css`                   |
| Navigation                                   | `mainNav` / `footerNav` in `lib/site.ts` |
| Privacy policy                               | `app/privacy-policy/page.tsx`          |
| How enquiries are delivered                  | `lib/enquiry.ts`                       |

```
app/                 routes — one folder per page; [category] renders seven category pages
components/layout    header, mobile menu, footer, mobile action bar, WhatsApp button
components/sections  page sections (Hero, Introduction, ShowroomSection, FAQ, …)
components/motion    reveal and entrance animations, marquee
components/gallery   masonry gallery and lightbox
components/contact   enquiry form
components/ui        buttons, links, headings, breadcrumbs, JSON-LD
lib/                 all content and business data
scripts/             prepare-images.mjs — crops, colour-grades and exports the source photographs
```

## Adding a photograph

1. Put the file in `public/images/` (JPEG, around 1600px on the long edge is plenty).
2. Import it in `lib/images.ts` and give it descriptive alt text.
3. Reference its key from `lib/categories.ts` or `lib/gallery.ts`.

Next.js generates the responsive AVIF/WebP sizes automatically.

### Matching the hero

Everything in `public/images/` is produced by `scripts/prepare-images.mjs` from the source pictures.
It gives each one a "golden hour" grade so the library sits in the light of the hero photograph:
white balance pulled warm, low sunlight laid in from one side, corners deepened. To add a picture
this way, add a line to `JOBS` in that script — `grade` is the strength (1 for cool, neutral
pictures; less for ones that are already warm; 0 to leave it alone) — and re-run `npm run images`.

## Adding a category

Add an entry to `categories` in `lib/categories.ts`. The page, the navigation in the footer, the
collections page, the sitemap and the metadata are all generated from that list.

## The home hero

The two hero photographs live in `assets/hero` (`hero-desktop.webp` for wide screens,
`hero-mobile.webp` for phones). To change them, replace those files and run:

```bash
npm run images -- "<folder with the other source images>"
```

The hero is a photograph that is quietly alive — every effect is something already in the picture:

- it opens like a room being lit: a dark veil lifts, warm light blooms from the window and the
  picture settles back;
- the rain shower runs, with rings where it lands, mist at its base and steam rising; the bath
  filler runs, rings spread across the bath and light shimmers on the water;
- sunlight breathes across the floor, leaf shadows sway over it and dust hangs in the window light;
- the LED coves glow, and on phones the candle flickers;
- the picture drifts slowly, eases against the pointer on desktop, and on scroll holds almost still
  and darkens while the next section rises over it.

Each effect is placed in **percentages of the photograph** ("Hero motion" in `styles/globals.css`),
separately for the desktop and phone pictures. If you swap a photograph for a different scene,
update those positions (and `--ratio`) or remove the effects that no longer apply.

## Colour

One warm palette, sampled from the hero photograph — there is no green anywhere on the site.
The tokens are in `styles/globals.css`:

| Token      | Hex       | From the photograph        | Used for                           |
| ---------- | --------- | -------------------------- | ---------------------------------- |
| `espresso` | `#1b120c` | deepest shadow in the timber | dark sections, header, footer     |
| `walnut`   | `#3a2010` | the slatted wall           | buttons, dark bands, links         |
| `timber`   | `#6c3f1d` | vanity drawer fronts       | hover and pressed states           |
| `bronze`   | `#84532a` | stone wall in shade        | labels and icons on light sections |
| `copper`   | `#b5814f` | brass in warm light        | hairline rules                     |
| `amber`    | `#e7b16d` | LED cove lighting          | accent on dark sections            |
| `sand`     | `#e1b897` | sunlit floor               | labels on dark sections            |
| `stone`    | `#dfd0bc` | travertine                 | image placeholders, dividers       |
| `linen`    | `#f0e6d8` | the counter top            | alternate light sections           |
| `ivory`    | `#f8f2e8` | ceramic in warm light      | the page                           |
| `ink`      | `#2b1e15` | —                          | text                               |

The one exception is the floating WhatsApp chat button, which shows the icon in WhatsApp's own
green and white so it is recognised at a glance. The other WhatsApp links use the palette.

### The brand logo

The logo on the brand page is the supplied file (`assets/brand/brand-logo.png`) recoloured to
`amber`. To change the colour, or to add a version for light sections, edit `VARIANTS` in
`scripts/prepare-brand-logo.mjs` and run `npm run logo`.

## Motion

- **Above the fold** (hero text): CSS animations, so they begin at first paint and never wait for
  JavaScript.
- **Hero photograph**: CSS only, transform and opacity. Loops are deliberately long and nothing
  animates while the hero is off screen — see the notes in `styles/globals.css`.
- **Scroll reveals**: CSS transitions switched on by one shared `IntersectionObserver`. The
  components render on the server and add no JavaScript of their own. Hairlines draw themselves in
  with their rows (`rule-t`).
- **Scroll-driven motion** ("Scroll-driven motion" in `styles/globals.css`): photographs drift
  inside their frames (`parallax`), the showroom photograph grows into place (`scroll-open`), page
  heroes hold back and darken, the header shows reading progress, the marquee leans with the scroll
  and the closing headline slides in. These use CSS scroll-driven animations, so they run on the
  compositor with no scroll listeners; browsers without support simply show everything at rest.
  A frame that holds a scroll-driven child must use `overflow-clip`, never `overflow-hidden`.
- **Buttons**: the fill rises from the bottom edge and the arrow is replaced by its twin.
- **Header**: a full-width bar on every screen size; it steps out of the way while reading down
  the page and returns on scrolling up.
- **WhatsApp button**: never sits over a hero photograph (sections marked `data-hero`) — it waits
  until the hero has scrolled out of its corner, and for five seconds after the page loads — and
  moves up at the foot of the page so the copyright and credit line are never covered.
- **Framer Motion**: mobile navigation, gallery lightbox and page transitions.

With `prefers-reduced-motion`, or with JavaScript unavailable, everything is simply shown in its
final state and the hero photograph is still.
