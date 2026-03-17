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
/extras         Extras — vibe coding showcase
```

---

## 3. Global Shell

**Navbar (sticky)** — See `design.md §7` for visual and layout spec.

- Logo: "Martta XU" text only → `/`; Geist 14px, weight 500, color `#1a1a1a`. No pill links — navigation moved to hero section.

**Footer — Animal Garden**

- Two-line Geist text, 14px, weight 500; gap 0 between lines:
  - Line 1: live Boston time — `[h:mm am/pm] in Boston, MA (Open to relocate)`; color `rgba(26,26,26,0.5)`
  - Line 2 desktop/tablet: `Fufu would like to play with you` + animated CatEars SVG; color `#1a1a1a`
  - Line 2 mobile: `Come to play with my cat - Fufu on desktop`
- Below the text (tablet/desktop only), an interactive pixel garden. Garden content band aligned with footer text (layout offset, no padding wrapper):
  - Wand cursor (`CatToy.gif`) replaces the system cursor **inside the footer only**, chasing interactions
  - Cat A (Fufu) chases the wand using directional walk GIFs and, when she reaches the cat bed area (a small zone around the bed, not pixel-perfect), she switches to a sleep GIF; Cat B cycles sleep/scratch states on click, and scratches when Fufu or the wand passes nearby
  - Fufu shows context-sensitive speech bubbles: "zzz" near bed, "~yum" near food, "!" / "!!" when chasing, "~♪" near flowers, "ふぅ" when resting, "meow?" when idle
  - Claw'd (pixel-art Claude crab) spawns when Fufu has been idle for a few seconds; Fufu chases the crab at a slower pace than the wand. Both take periodic rest breaks (5–7s chase, 2.5–3.5s rest). The crab evades when Fufu gets close. Wand interaction always takes priority and despawns the crab
  - Chick wobbles when the wand passes nearby; bunny jumps on click, then settles back to sitting; flowers wobble gently on hover
  - Garden hidden on mobile (<640px); only the text lines show

---

## 4. Pages

### 4.1 Home (`/`)

**Wireframes:** `images/UI reference`

**Hero** — See `design.md` for layout and typography.

The entry point. On large screens, a two-column layout: headline on the left; right column has Resume/About/Extras as `hero-nav-link` links, vertical stack, right-aligned. On tablet and mobile, nav links appear below the headline in a horizontal row.

Headline copy:

> "My design practice lives in the making - through .fig files, code, and increasingly AI. And in the curating - knowing where to linger, and where to let go. Right now I'm at Datalign✦, building in wealth management. 
>
> Previously: engineering at Thoughtworks✦, user research at LookLook✦, strategy at PwC✦ and JLL✦."

**Project Grid**
The work. Two-column masonry layout. Each project card: single cover image (varying aspect ratio), a metadata row (company · industry · date · type), and a one-line headline. Cards flow top-to-bottom within each column; the stagger comes from varying image proportions. On mobile (<1024px), collapses to a single column. See `design.md §7` for breakpoint and spacing.

Data sourced from `src/data/projects.json`. Each entry requires: `id`, `company`, `industry`, `date`, `type`, `headline`, `image`, `width`, `height`, `href`.

---

### 4.2 About (`/about`)

**Layout:** Single scroll, content hugs height (no forced full-viewport stretch). Text section on top — left 50% on desktop, full width on tablet and below (`lg:w-1/2`). Photo strip at bottom.

**Headline style:** "I'm a designer who reads the room - and the signal." renders in static accent-hover state: accent red (`#EC4523`), dotted underline, faint orange background. No hover interaction — it's always in that state.

**Copy:**

> I'm a designer who reads the room - and the signal.
>
> I practice Swing - a dance with no routine, just feeling and responding to what you're given.
>
> The path to here went through business and strategy. Both felt too far from the thing itself. Design is where I get to actually build something for someone to use.
>
> I believe good experiences and beautiful things make people feel better. That's enough reason.
>
> If you're building something, let's talk! Open to full-time roles and relocation.

**"let's talk" interaction (`CopyEmail` component):** On hover, a tooltip appears below with accent orange background, copy icon, and "copy email" text. On click, copies `martta.xu@outlook.com` to clipboard; tooltip switches to checkmark + "copied!". Tooltip implemented in pure CSS (`:hover`) to avoid gap/flicker issues.

**Photo grid:** 6 life photos in a CSS grid — 3 columns on mobile, 6 columns on sm+. Each cell is 1:1 aspect ratio, `object-fit: cover`. Images stored as `.webp` in `public/images/about/`.

---

### 4.3 Extras (`/extras`)

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