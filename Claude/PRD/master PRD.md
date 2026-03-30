# gPRD.md - Martta Xu Portfolio (2026)

*Version: 2.4*
*Last updated: March 25, 2026*
*Author: Martta Xu*

> For all visual and interaction decisions, refer to `design.md`. No design spec belongs in this file.

---

## 1. Product Vision

**Primary goal:** Convert hiring managers and recruiters into interview offers - by showing the quality of the work, not just the résumé.

**Core identity:** "I design access."

**Development philosophy:** Vibe First. The frontend must feel right before any backend or AI logic is connected.

---

## 2. Sitemap

```
/               Home - work overview
/about          About - concise personal intro
/extras         Extras - vibe coding showcase
/work/[slug]    Case study - per-project deep dive (e.g. /work/ark7)
```

---

## 3. Global Shell

**Navbar (sticky)** - See `design.md §7` for visual and layout spec.

- 12-column grid layout (`grid-layout` class; horizontal padding 24px mobile / 72px lg). Geist **15px**, weight 500, color `#1a1a1a`; `.nav-tab` opacity 0.4 on hover; no underline.
- Logo "Martta XU": `col-start-1`, `col-span-6` (mobile) / `md:col-span-1` → `/`
- Nav links (Work / About / Extras / Resume): desktop row `md:col-start-2`, `md:col-span-11`, gap 24px; small orange triangle indicator under the active link (animated `left`).
- Mobile: hamburger opens slide-down menu with the same links + Resume.
- **No** live clock and **no** copy-email control in the navbar (both live in the footer).

**Custom Cursor**

- JS-based cursor (`CustomCursor.tsx`, rendered in root layout). CSS sets `cursor: none !important` globally.
- A `position: fixed` div follows the mouse via `requestAnimationFrame`; renders an orange triangle SVG (32×32, `#EC4523` fill, white stroke).
- Hidden on touch devices (`pointer: coarse`), hidden when over the Garden section (`data-garden-section` attribute), hidden when mouse leaves the viewport (`mouseleave` on `documentElement`).
- `<noscript>` fallback in layout restores `cursor: auto` if JS fails.

**Footer - Site Footer**

- Normal-flow footer on all pages (not fixed/sticky). Border-top `rgba(26,26,26,0.14)`; horizontal padding `24px` / `72px` (lg), vertical `pt-5` / `pb-7`.
- **Left:** Live Boston time (America/New_York), formatted without am/pm prefix + `"Boston, MA"`.
- **Right:** Email `martta.xu@outlook.com` (Geist 15px, **50% opacity** ink) + icon button: copy SVG → on success, checkmark SVG (**solid** `var(--color-accent)`); default icon ink at 50% opacity; **hover** icon uses **solid** accent. No pill border on the icon button.
- **External profile links** (`CHANGELOG`, `LinkedIn`, `X`) were moved to the **home hero** (right column). Data: `src/data/footerLinks.ts`. `CHANGELOG` → GitHub Releases.

---

## 4. Pages

### 4.1 Home (`/`)

**Wireframes:** `images/UI reference`

**Hero** - See `design.md` for layout and typography.

The entry point. **Flex row** from `lg`: headline block on the **left** (roughly half width, `max-w` capped), **external links** on the **right** - same stack as the old footer: `CHANGELOG`, `LinkedIn`, `X` (Geist 15px, `hero-nav-link`, vertical column, `items-end`). Below `lg`, links sit under the headline (still right-aligned in their row). Navbar holds Work / About / Extras / Resume only.

Headline copy (inline links use `hero-company-link` with numbered `data-num` **1–6**):

> "My design practice lives in the making - through .fig files, code, and increasingly AI. And in the curating - knowing where to linger, and where to let go. Right now I'm at **Datalign**¹, building in wealth management. Previously: design(contract) at **ARK7**², engineering at **Thoughtworks**³, user research at **Looklook**⁴, strategy at **PwC**⁵ and **JLL**⁶."

- Bio companies: `hero-company-link` - dotted underline, **numeric** badge via `::after` (`data-num` 1–6), accent on hover.
- Hero external links: `hero-nav-link` - badge character **`↗`** for each (external link affordance); see `design.md` for `::after` rules.

**Project Grid**
The work. Uses `grid-layout` class (12-col); project cards wrapped in a `col-start-1 col-end-13` inner div with CSS masonry (`columns-1 lg:columns-2`). Each card: cover image, metadata row (company · industry · date · type), one-line headline. Collapses to single column below lg (1024px). See `design.md §7` for spacing.

Data sourced from `src/data/projects.json`. Each entry requires: `id`, `company`, `industry`, `date`, `type`, `headline`, `image`, `width`, `height`, `href`.

---

### 4.2 About (`/about`)

**Layout:** Flex-column page: hero **section** (`flex-1`) + Garden wrapper. Text at top (`lg:max-w-[50%]`); polaroids share the section; extra vertical slack is absorbed by the hero section so the Garden sits flush above the global footer (no dead flex gap).

**Headline style:** No separate display headline. **Three** body paragraphs, same style as home hero (`HERO_TEXT`: Geist, 16px, weight 500, line-height 150%, max-width 600px, 16px gap between paragraphs).

**Copy (summary):** (1) Northeastern + Boston College + lens on product. (2) Swing + improv line. (3) Fufu + digitized cat.

`Northeastern`, `Boston College`, and `Swing` use `hero-company-link` with `data-num` 1–3.

**Draggable polaroids:** 7 photos; `DraggablePolaroids.tsx`. Separate **pose sets** for tablet vs desktop (`POSES_TABLET` / `POSES_DESKTOP`); desktop uses wider X/Y spread so cards do not clump. **Smaller frame** on tablet (`md`–`lg`) vs `lg+`. Desktop: absolute right half; tablet: below copy with min-height; mobile: hidden.

**Garden section:** Same **horizontal padding** as the about hero: `24px` / `72px` (lg) on the wrapper around `Garden` (Garden tip row no longer adds duplicate horizontal padding).

---

### 4.3 Extras (`/extras`)

Demonstrates vibe-coding capability - real tools Martta has built. Each card shows a live preview (image or GIF), title, short description, tech stack, and a "Click to play" action.

Data sourced from `src/data/tools.json`.

---

### 4.4 Case Study Template (`/work/[slug]`)

The case study page is a reusable template. First implementation: `/work/ark7`. Future case studies copy the layout and component patterns.

**Layout:** Three-column grid on desktop - sticky side nav left, content column center (`max-w-[800px]`), empty gutter right. Single column on mobile. Use `minmax(0,…)` and `min-w-0` to prevent horizontal overflow.

**Side Navigation**

Vertical rail with a sliding dot tracking the active section via `IntersectionObserver`. The dot moves via `transform: translateY(…)` - no jump cuts. Clicking a label smoothly scrolls to the section. Sections are defined in a `SECTIONS` array (id, label, title, body[]); the nav renders from that array.

**Hero block**

- Eyebrow: project + domain (`ARK7 • FinTech`); Geist 14px weight 500 muted
- `h1`: tiemposText 28px weight 500
- Full-width `16:9` cover image with `border border-[var(--color-ink-14)]`
- Metadata row: Role / Timeline / Team - 3 cols desktop, stacked mobile

**Section rhythm** (sections separated by `gap-16 md:gap-20` + `1px` rule + `mt-10 md:mt-12`):

- Eyebrow + `h2` title block: reveals first (CaseScrollReveal, delay 0)
- Body content: reveals 80ms after title (CaseScrollReveal delay=80); `gap-5` between paragraphs/components
- Title block → body gap: `gap-7` (28px) — one step above paragraph spacing to signal the title introduces what follows
- `h2`: tiemposText 24px weight 400 + `2px solid var(--color-accent-green)` left border, `pl-3`
- Body: Geist 16px / 160% `var(--color-ink-80)`
- Subsection `h3`: same style as `h2`, no extra top margin (use `gap-5` flow)

**Established content sub-patterns** (copy from ARK7 as needed):

- **2×2 image audit grid** - `grid-cols-1 md:grid-cols-2 gap-5 md:gap-6`; each cell: image container (`rounded-lg p-3 bg-[var(--color-subtle)]`, fixed `h-96` inner div, `object-contain object-top`) + title (Geist 15px weight 600) + body
- **Tab switcher** - tablist right-aligned (`justify-end`); underline tabs (active: `border-[var(--color-ink)]`); panel: `rounded-lg border border-[var(--color-ink-14)] p-5 md:p-8`; image only or image + text layout; switch animation via `ark7-layout-tab-panel-enter`
- **2-column persona journey** - `grid-cols-1 md:grid-cols-2 gap-8 md:gap-10`; each col: `h3` subsection title + body
- **Feature reveal** - `<mark className="case-text-highlight">Feature name</mark>` label → 2-col quote grid (no frames; tiemposText 15px italic) → full-width image (`w-full h-auto`, no frame)
- **Metrics bullet list** - `list-none flex-col gap-3`; each item: left `2px solid var(--color-ink-14)` border, `pl-4`; bold numbers via inline `font-weight: 600 color: var(--color-ink)` span
- **Next project link** - inside content column, `mt-12 md:mt-16`; no border; small muted meta line + tiemposText 18px `var(--color-ink-80)` headline with `→`; color darkens on hover

**Font assignments:**

- `tiemposText` → h1, h2, h3 section titles, pull-quote text, next-project headline
- Geist → all other text (labels, body, metadata, nav, captions, bullets)

---

### 4.5 404 Page

A custom not-found page. Should feel intentional, not broken - consistent with the site's visual identity.

**Content:** "It looks like you’ve wandered off the path...  
But don’t worry, every detour is just a chance to connect the dots in a new way."

**Button icon:** home-8-line.svg

**Button style:** Consistent with site primary actions

---

## 5. Content Notes

⚠️ All project descriptions, essay copy, and testimonials are placeholder. Use Lorem Ipsum freely during the build - do not wait for final copy to unblock UI work.

- Home hero company callouts use **numbered** superscripts via `data-num`, not ✦ stars.

**Project preview asset sources:**

- **NARS (looklook-nars)** - Preview animation (`Nars-playful.json`) is built from imagery sourced from: [https://www.popsugar.com/beauty/Best-Sephora-Foundations-2019-45625120](https://www.popsugar.com/beauty/Best-Sephora-Foundations-2019-45625120)

---

## 6. Technical Stack


|           |                                                             |
| --------- | ----------------------------------------------------------- |
| Framework | Next.js 15 (App Router)                                       |
| Styling   | Tailwind CSS v4                                               |
| Animation | (lightweight CSS / component logic; Lottie where needed)     |
| Fonts     | See `design.md` §4                                          |
| Viewport  | Tablet + desktop + mobile. See `design.md` for breakpoints. |


---

## 7. Development Phases

**Phase 1 - The Canvas**
Project setup. Global shell (Navbar, Footer). Design tokens and fonts configured.

**Phase 2 - The Look**
Static layouts for all three pages. Placeholder images and copy throughout.

**Phase 3 - The Vibe**
Interactions: "In Their Eyes" hover + profile cards, project and tool card hovers.

**Phase 4 - The Brain**
Real assets and copy replace placeholders. Integrate Vercel Analytics.