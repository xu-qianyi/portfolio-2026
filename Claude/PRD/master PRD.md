# PRD.md — Martta Xu Portfolio (2026)

*Version: 2.2*
*Last updated: March 2026*
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
/about          About — who Martta is, in two voices
/tools          Tools — vibe coding showcase
```

---

## 3. Global Shell

**Navbar (sticky)** — See `design.md §7` for visual and layout spec.

- Logo: "Martta XU" text only → `/`; Geist 14px, weight 500, color `#1a1a1a`. Resume/About/Tools pill links; hover: 50% opacity.
- Resume → external PDF (Google Drive, new tab)
- About → `/about`
- Tools → `/tools`

**Footer — Animal Garden**

- Two-line Playfair Display text, black (`#1a1a1a`), italic; second line `paddingTop: 0`:
  - Line 1: `© 2026 brewed by Martta + Cursor + Claude Code`
  - Line 2 desktop/tablet: `Fufu would like to play with you` 
  - Line 2 mobile: `Come to play with my cat - Fufu on desktop`
- Below the text (tablet/desktop only), an interactive pixel garden. Garden content band aligned with footer text (layout offset, no padding wrapper):
  - Wand cursor (`CatToy.gif`) replaces the system cursor **inside the footer only**, chasing interactions
  - Cat A (Fufu) chases the wand using directional walk GIFs and, when she reaches the cat bed area (a small zone around the bed, not pixel-perfect), she switches to a sleep GIF; Cat B cycles sleep/scratch states on click
  - Bunny jumps on click, then settles back to sitting; flowers wobble gently on hover
  - Garden hidden on mobile (<640px); only the text lines show

---

## 4. Pages

### 4.1 Home (`/`)

**Wireframes:** `images/UI reference`

**Hero** — See `design.md` for layout and typography.

The entry point. On large screens, a two-column layout: headline on the left; right column is intentional negative space.

Headline copy:

> "My design practice lives in the making - through .fig files, code, and increasingly AI. And in the curating - knowing where to linger, and where to let go. Right now I'm at Datalign✦, building in wealth management. 
>
> Previously: engineering at Thoughtworks✦, user research at LookLook✦, strategy at PwC✦ and JLL✦."

**Project Grid**
The work. Two-column masonry layout. Each project card: single cover image (varying aspect ratio), a metadata row (company · industry · date · type), and a one-line headline. Cards flow top-to-bottom within each column; the stagger comes from varying image proportions. On mobile (<1024px), collapses to a single column. See `design.md §7` for breakpoint and spacing.

Data sourced from `src/data/projects.json`. Each entry requires: `id`, `company`, `industry`, `date`, `type`, `headline`, `image`, `width`, `height`, `href`.

---

### 4.2 About (`/about`)

Two distinct sections, two distinct voices.

**A. "In Their Eyes" — Social proof through others' words**

A list of testimonials from colleagues and collaborators. The interaction: hovering a quote highlights a key phrase and surfaces a profile card (name, role, photo) that appears left or right of the text — alternating as the user reads down the page. The effect should feel discovered, not announced.

Reference aesthetic: YC "In Founders' Words" (ycombinator.com).

Data sourced from `src/data/testimonials.json`.

**B. "In Her Own Eyes" — Personal narrative**

A first-person essay in Martta's own voice. Prose only. No bullet points, no headers. This section answers: who is she beyond the work?

**Copy:**

> I used to think access was a business problem. You set the right price, you open the right market, the right people get in. I was good at that logic. Winner of global business competition, ACCA certified, management and strategy consulting experience, a product management internship at top language-learning startup in China - I understood how products get built and why companies do what they do.
>
> But at that startup I watched something happen up close: great strategy, mediocre product. The gap between the deck and the screen. That's where people get lost.
>
> I went back to school to close that gap. I learned design and engineering together because I needed both hands. One to understand the person, one to build the thing.

---

### 4.3 Tools (`/tools`)

Demonstrates vibe-coding capability — real tools Martta has built. Each card shows a live preview (image or GIF), title, short description, tech stack, and a "Click to play" action.

Data sourced from `src/data/tools.json`.

---

### 4.4 404 Page

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
| Framework | Next.js 15 (App Router)                                     |
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