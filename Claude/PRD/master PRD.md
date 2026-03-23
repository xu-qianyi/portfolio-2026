# gPRD.md — Martta Xu Portfolio (2026)

*Version: 2.3*
*Last updated: March 23, 2026*
*Author: Martta Xu*

> For all visual and interaction decisions, refer to `design.md`. No design spec belongs in this file.

---

## 1. Product Vision

**Primary goal:** Convert hiring managers and recruiters into interview offers — by showing the quality of the work, not just the résumé.

**Core identity:** "I design access."

**Development philosophy:** Vibe First. The frontend must feel right before any backend or AI logic is connected.

---

## 2. Sitemap

```
/               Home — work overview
/about          About - concise personal intro
/extras         Extras — vibe coding showcase
/work/[slug]    Case study — per-project deep dive (e.g. /work/ark7)
```

---

## 3. Global Shell

**Navbar (sticky)** — See `design.md §7` for visual and layout spec.

- 12-column grid layout (`grid-layout` class, `px-[72px]` lg); Geist 16px, weight 500, color `#1a1a1a`, opacity 0.7 on hover; no underline.
- Logo "Martta XU": col-span-1 → `/`
- Nav links (Work / About / Extras / Resume): `md:col-start-2`, `md:col-span-8` (desktop)
- Live Boston clock (no am/pm): col-start-11, col-span-2, right-aligned; hidden on tablet and below

**Footer - Site Footer**

- Normal-flow footer on all pages (not fixed/sticky).
- Left side: live Boston time.
- Right side: vertically stacked links `CHANGELOG`, `LinkedIn`, and `X`.
- `CHANGELOG` points to GitHub Releases.

---

## 4. Pages

### 4.1 Home (`/`)

**Wireframes:** `images/UI reference`

**Hero** — See `design.md` for layout and typography.

The entry point. Single-column hero text spanning the left half of the page (`grid lg:grid-cols-2`, text in col 1). Nav links (Work/About/Extras/Resume) live in the navbar, not the hero.

Headline copy:

> "My design practice lives in the making - through .fig files, code, and increasingly AI. And in the curating - knowing where to linger, and where to let go. Right now I'm at Datalign¹, building in wealth management.
>
> Previously: engineering at Thoughtworks², user research at LookLook³, strategy at PwC⁴ and JLL⁵."

Company names are `hero-company-link` — dotted underline, numbered badge (1–5 via `data-num`), accent red hover.

**Project Grid**
The work. Uses `grid-layout` class (12-col); project cards wrapped in a `col-start-1 col-end-13` inner div with CSS masonry (`columns-1 lg:columns-2`). Each card: cover image, metadata row (company · industry · date · type), one-line headline. Collapses to single column below lg (1024px). See `design.md §7` for spacing.

Data sourced from `src/data/projects.json`. Each entry requires: `id`, `company`, `industry`, `date`, `type`, `headline`, `image`, `width`, `height`, `href`.

---

### 4.2 About (`/about`)

**Layout:** Matches the home hero positioning. Uses the same grid section (`grid lg:grid-cols-2`) and spacing tokens as `/`, with text in the left column on desktop and full width on smaller breakpoints.

**Headline style:** No separate display headline. The page shows one body paragraph using the same text style as the home hero (`HERO_TEXT`: Geist, 16px, weight 500, line-height 150%).

**Copy:**

> "I studied design and engineering at Northeastern, finance at Boston College. I practice Swing - a dance with no routine, just feeling and responding to what you're given."

`Northeastern`, `Boston College`, and `Swing` use `hero-company-link` treatment with numbered badges (`data-num` 1-3), matching the interaction style used on the home hero.

**Garden section:** The interactive Garden component is no longer the global site footer. It appears as a full-width section at the bottom of the About page content.

---

### 4.3 Extras (`/extras`)

Demonstrates vibe-coding capability — real tools Martta has built. Each card shows a live preview (image or GIF), title, short description, tech stack, and a "Click to play" action.

Data sourced from `src/data/tools.json`.

---

### 4.4 Case Study Template (`/work/[slug]`)

The case study page is designed as a reusable template. The first implementation is the Ark7 project (`/work/ark7`); future projects reuse the same layout and components.

**Layout:** Two-column on desktop — a fixed side navigation on the left, scrollable content on the right. On mobile, the side nav collapses (details TBD).

**Side Navigation**

Inspired by Are.na's filter menu interaction. The mechanism:

- A vertical list of section names is rendered in the left column (e.g. Overview, Problem, Process, Solution, Results).
- A vertical rail runs alongside the list. A small filled dot sits on this rail and tracks the active section.
- The dot moves via `transform: translateY(...)`, animating smoothly whenever the active section changes — no jump cuts.
- The active section's label is also visually highlighted (bold or color change).
- Active section is determined by `IntersectionObserver` watching each content section as the user scrolls.
- Clicking a nav item smoothly scrolls the page to the corresponding section.

The overall effect: the dot slides up and down the rail like a needle, giving the reader a clear, unobtrusive sense of where they are in the narrative.

The side nav renders a flat list of section labels sourced from the project's data. The number and names of sections vary per project and are defined in project data, not in this template. Each content section carries an `id` that matches its nav entry.

**Content Layout**

The case study uses a 3-column page grid: sticky side nav on the left, bounded main content in the center, empty gutter on the right for visual breathing room.

- Page grid: `grid-cols-1 md:grid-cols-[220px_1fr_220px]`
- Center content: `max-w-3xl` on md, `max-w-4xl` on lg; `py-12`; `flex flex-col gap-12 md:gap-24`

**Hero block** (top of content, before first section):

- Small label — project name + year; Geist, 14px, weight 500, muted
- Large headline (`h1`) — Playfair Display, display size
- Full-width `16:9` cover image below the headline
- Metadata row: Role / Timeline / Team / Skills — 4 columns on desktop, stacked on mobile; Geist; label weight 500, value weight 400

**Section rhythm** (repeats for each content section):

- Section label (`h4`): Geist, 12–13px, weight 500, uppercase, muted — matches the nav item label
- Section headline (`h2`): Playfair Display, large — the key argument or question of that section
- Body paragraphs (`p`): Geist, 16px, weight 400, line-height 1.6
- Optional `1px` full-width horizontal rule (`foreground/10` opacity) between major sections

**Content sub-patterns** (used within sections as needed):

- **Block quote / key insight** — Playfair Display italic; left border `2px` accent color, `pl-4`
- **Two-column callout cards** — `flex-col md:flex-row gap-6`; each card: short bold label + supporting sentence; Geist
- **Media + caption** — `grid-cols-1 md:grid-cols-[60%_auto]`; image/placeholder left (`border border-foreground/10`), caption text right (Geist 14px, bottom-aligned on desktop)
- **Full-width image** — `w-full h-auto object-contain`, `border border-foreground/10`

**Font assignments:**

- Playfair Display → `h1`, `h2`, block quote text
- Geist → all other text (labels, body, metadata, nav, captions)

---

### 4.5 404 Page

A custom not-found page. Should feel intentional, not broken — consistent with the site's visual identity.

**Content:** "It looks like you’ve wandered off the path...  
But don’t worry, every detour is just a chance to connect the dots in a new way."

**Button icon:** home-8-line.svg

**Button style:** Consistent with site primary actions

---

## 5. Content Notes

⚠️ All project descriptions, essay copy, and testimonials are placeholder. Use Lorem Ipsum freely during the build — do not wait for final copy to unblock UI work.

- Four-pointed star icons (✦) next to company names in the home hero are a visual detail only; they do not indicate separate footnotes or references. See `design.md` for visual spec.

**Project preview asset sources:**

- **NARS (looklook-nars)** — Preview animation (`Nars-playful.json`) is built from imagery sourced from: [https://www.popsugar.com/beauty/Best-Sephora-Foundations-2019-45625120](https://www.popsugar.com/beauty/Best-Sephora-Foundations-2019-45625120)

---

## 6. Technical Stack


|           |                                                             |
| --------- | ----------------------------------------------------------- |
| Framework | Next.js 16 (App Router)                                     |
| Styling   | Tailwind CSS                                                |
| Animation | Framer Motion                                               |
| Fonts     | See `design.md` §4                                          |
| Viewport  | Tablet + desktop + mobile. See `design.md` for breakpoints. |


---

## 7. Development Phases

**Phase 1 — The Canvas**
Project setup. Global shell (Navbar, Footer). Design tokens and fonts configured.

**Phase 2 — The Look**
Static layouts for all three pages. Placeholder images and copy throughout.

**Phase 3 — The Vibe**
Interactions: "In Their Eyes" hover + profile cards, project and tool card hovers.

**Phase 4 — The Brain**
Real assets and copy replace placeholders. Integrate Vercel Analytics.