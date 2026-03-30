# design.md - Martta Xu Portfolio

*Last updated: March 27, 2026*
*Keep this file tight. When updating, refine - don't just add.*

---

## 1. Design Identity

**One sentence:** Quiet confidence. The site steps back so the work steps forward.

**Three words:** Precise. Considered. Uncluttered.

**The hiring manager should leave thinking:** "She has taste." Not "wow, flashy" - taste. The kind that comes from knowing what to leave out.

---

## 2. What This Site Is Not

These are hard constraints. If a decision pushes toward any of these, it's the wrong decision.

- **Not a creative agency site.** No scroll-jacking, no text that explodes on entrance, no cursor theater. The orange triangle cursor is the one exception - it's small (32px), quiet, and consistent. It signals craft without performing it.
- **Not a resume dump.** Text exists to give context to work, not replace it. If a section is becoming a wall of words, cut it.
- **Not decoration-first.** Animation and interaction exist to aid comprehension or signal craft - never to entertain.
- **Not dark mode.** White is the canvas. The work provides the color.

---

## 3. Color

**Palette philosophy:** Black and white with a single accent. The accent is the only color that carries meaning - use it sparingly so it always lands.

```
--color-ink:           #1A1A1A   /* Primary text */
--color-surface:       #FFFFFF   /* Page background */
--color-subtle:        #F5F5F5   /* Card backgrounds, subtle fills */
--color-muted:         #737373   /* Secondary labels, meta, footer default */
--color-accent:        #EC4523   /* Interaction: hovers, badges, footer copy success */
--color-accent-green:  #3F7A66   /* Case-study editorial only: pull-quote / section rule, inline highlight wash */
--color-accent-tint:   rgba(236,69,35,0.02) /* Hover background wash on inline links and nav buttons */
--color-ink-80 …:      rgba(26,26,26,0.8) etc. /* Body narrative on work pages */
```

**Rules:**

- **Orange accent** = interaction and home hero. **Green accent** = `/work/*` editorial spine (left rule on `h2`, optional `mark.case-text-highlight` wash). Do not use green for global nav/footer CTAs.
- **Bio company links** (`.hero-company-link`): badge = `attr(data-num)` in `::after`, **absolute** (`top` / `right`), **10px**, accent, `opacity: 0.8`.
- **Home hero external links** (`.hero-nav-link`): badge = **`↗`** via `data-num`; `::after` is **inline superscript** (`vertical-align: super`, **8px**, `margin-left: 0.12em`), accent, `opacity: 0.8` - no absolute positioning.
- **Footer** default copy + copy icon: **`var(--color-muted)`**; **hover** copy icon and **success** checkmark: **solid** `var(--color-accent)` (no alpha on accent for those states).
- Accent orange never as: decorative backgrounds, full-bleed section rules, illustration fill.
- When in doubt, use `--color-ink` at reduced opacity rather than a new hue.

---

## 4. Typography

**tiemposText** - Hero headline and project/display headlines. Serif voice for editorial presence.
**Geist** - UI, body, card metadata, navigation, footer. Anything read as interface/content.

```
Home / About intro:   Geist, 16px, weight 500, line-height 150%, color #1A1A1A
Project metadata:     Geist, 14px, weight 500, color var(--color-muted); dot separators between company · industry · date · type
Project headline:     tiemposText, 20px, weight 400, line-height 130%, color #1A1A1A
Section heading:      Geist, 1.25rem, weight 500, line-height 1.3
Body / narrative:     Geist, 1rem, weight 400, line-height 1.7
Caption / meta:       Geist, 0.875rem, weight 400, color --color-muted
Nav:                  Geist, 15px, weight 500, #1a1a1a; desktop `.nav-tab` **color** → `var(--color-muted)` on hover (200ms ease); no underline; grid-layout; logo md:col-span-1; links md:col-start-2 md:col-span-11, gap 24px
Home hero externals:  Geist, 15px, weight 500; CHANGELOG / LinkedIn / X as `.hero-nav-link`, flex-col items-end, gap 4px (right of headline from lg)
Footer:               Geist, 15px, weight 500; flex space-between wrap; left: Boston time; right: email + copy/check icon (see §3)
Work case study:      Eyebrow Geist 13px uppercase muted; section title tiemposText 24px + 2px left `var(--color-accent-green)` + pl-3; subsection h3 same style + marginTop 2rem; body Geist 16px / 160% `var(--color-ink-80)`; hero H1 tiemposText 28px weight 500; data tables tiemposText ~15px. Pull-quotes reuse title rule. Links in prose: `.case-inline-link` (dotted underline, accent hover). Image containers in audit grids: `rounded-lg p-3 bg-[var(--color-subtle)]`, inner div `h-96 object-contain object-top`.
```

**Rules:**

- **Home / About narrative:** avoid bold for emphasis - split copy instead.
- **Case studies:** `font-semibold` + `var(--color-ink)` allowed for short leads (e.g. insight first sentences) and table labels; optional `case-text-highlight` (green wash) for phrases like “Initial question,” not whole paragraphs.
- Never center-align body text. Left-aligned only.
- Heading hierarchy should be felt, not announced - avoid H1/H2/H3 visual jumps that feel like a document.

---

## 5. Spacing & Layout

**Philosophy:** Generous at **chapter** boundaries; tight within a **single argument**. Space signals “new idea,” not decoration.

```
Page horizontal pad:   24px mobile, 72px desktop (lg+); shared via `.grid-layout` class (repeat(12, 1fr), col-gap 24px)
Navbar:               12px vertical; grid-layout class; no left padding (grid column 1 is logo); right padding 72px lg
Hero padding:         desktop 52px top / 64px bottom, 72px horizontal; tablet 28px top / 40px bottom; mobile 64px vertical, 24px horizontal; hero is flex row lg (headline + link column), not a 2-col grid
Project section:      grid-layout; masonry columns-1 lg:columns-2; 24px col-gap; pb-20
Footer padding:       pt-5 pb-7; px-6 lg:px-[72px]; border-top rgba(26,26,26,0.14)
About garden wrap:    px-[24px] lg:px-[72px] (match hero), no double horizontal padding inside Garden tip row
Marketing “chapters”:  Large vertical gaps (e.g. ~5rem–7rem) between major bands where appropriate
```

**Work case study page** (`/work/ark7`, max-width ~800px column):

```
Page vertical:         py-14 md:py-16; horizontal px-6 lg:px-[72px]
Hero stack (header):   gap-8 md:gap-10 between title, hero image, meta row
Between SECTIONS:      gap-16 md:gap-20 + `h-px` rule with mt-10 md:mt-12
Section outer wrapper: gap-7 (title block → body content; one step above paragraph spacing)
Inside body content:   gap-5 (between paragraphs, between sub-components)
Research “acts”:       mt-8 md:mt-10 between narrative blocks (e.g. charts → personas → matrix); inside each act, gap-5
Tables:                my-6 md:my-8 vertical only (no frame); overflow-x-auto
```

**About Garden:** Scene uses `gardenX` horizontal band inside the padded wrapper - align with page margins above.

**Breakpoint:** Below lg: single-column project stack. lg+: 2-column masonry.

**Rules:** Never crowd cards. External links live in the **home hero** (right), not the footer. Navbar has no clock / no copy-email. On case studies, do **not** uniform-inflate every gap - separate **section** rhythm from **subsection** rhythm.

---

## 6. Animation & Interaction

**Philosophy:** Motion should feel slow and deliberate - like turning a page, not a notification ping.

```
Default duration:     400ms
Default ease:         cubic-bezier(0.4, 0, 0.2, 1)   /* Material "standard" - smooth deceleration */
Hover transitions:    300ms cubic-bezier(0.4, 0, 0.2, 1)
Profile card fade:    350ms ease, slight translateY(8px) → translateY(0)
Cursor:               JS div (CustomCursor.tsx); orange triangle SVG 32×32; cursor: none globally via CSS;
                      hidden on touch devices (pointer: coarse) and over Garden section (data-garden-section);
                      triangle tip offset corrected by translate(x-2, y-2)
```

**Rules:**

- Every animation must have a functional reason. "It looks cool" is not a reason.
- No entrance animations on the home page or about page. Case study pages (`/work/*`) use `CaseScrollReveal` for scroll-triggered fade-up (opacity + translateY 20px, ~380-460ms ease-out). First-screen elements reveal on load via double rAF; below-fold elements trigger via IntersectionObserver.
- Hover states on cards: subtle shadow lift + scale(1.015). Never scale more than 1.02.

---

## 7. Component Voice

**Project Cards (masonry layout):** Two-column masonry from lg (1024px); each card is a single cover image + two-row text block.

```
Layout:                CSS columns: 2 at lg+, column-gap 24px; break-inside avoid; <1024px → columns: 1 (vertical stack)
Card gap:              48px vertical between cards (margin-bottom)
Image:                 width 100%, aspect-ratio from data (varies per card), object-fit cover, border 1px solid rgba(204,209,218,0.2)
Metadata row:          Geist, 14px, weight 500, var(--color-muted); items separated by · dot dividers (4px circle, rgba(26,26,26,0.3)); 16px above; order: company · industry · date · type
Headline:              tiemposText, 20px, weight 400, line-height 130%, #1A1A1A; 4px below metadata
```

**Tools Cards:** Slightly more playful than project cards (vibe coding), still within grid discipline.

**"In Their Eyes" Testimonials:** Profile cards appear/disappear quietly - felt discovered, not announced.

**Navigation:** Sticky; `grid-layout`; logo + link row as above; mobile hamburger + drawer.

```
Logo / links:          Geist 15px, weight 500, #1a1a1a; active tab indicator: small accent triangle under link
```

**Hero inline links:** Dotted underline, accent hover, light accent tint on hover background.

```
.hero-company-link     Home **bio** companies; numeric data-num 1–6; ::after absolute, 10px, accent
.hero-nav-link         Home **CHANGELOG / LinkedIn / X**; data-num "↗"; ::after superscript, 8px, accent (see §3)
```

---

## 8. Writing Style (for AI-generated or placeholder copy)

- Short sentences. Never more than 25 words.
- No adjective stacking. One strong word beats three weak ones.
- First person where appropriate ("I design access") - direct, not performative.
- No buzzwords: no "passionate," "innovative," "leverage," "synergy."
- Descriptions of work answer: *what was the problem, what changed because of the design* - not what tools were used.
- **Dashes:** always use ` - ` (spaced hyphen). Never use `—` (em dash).

---

## 9. How to Update This File

1. **Refine, don't append.** Replace stale rules instead of stacking.
2. Log rationale in `CHANGELOG.md`, not here. Put code tokens in backticks or code blocks.
