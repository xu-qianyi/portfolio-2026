# design.md — Martta Xu Portfolio

*Last updated: March 2026*
*Keep this file under 150 lines. When updating, refine — don't just add.*

---

## 1. Design Identity

**One sentence:** Quiet confidence. The site steps back so the work steps forward.

**Three words:** Precise. Considered. Uncluttered.

**The hiring manager should leave thinking:** "She has taste." Not "wow, flashy" — taste. The kind that comes from knowing what to leave out.

---

## 2. What This Site Is Not

These are hard constraints. If a decision pushes toward any of these, it's the wrong decision.

- **Not a creative agency site.** No oversized cursors, no scroll-jacking, no text that explodes on entrance. Restraint is the point.
- **Not a resume dump.** Text exists to give context to work, not replace it. If a section is becoming a wall of words, cut it.
- **Not decoration-first.** Animation and interaction exist to aid comprehension or signal craft — never to entertain.
- **Not dark mode.** White is the canvas. The work provides the color.

---

## 3. Color

**Palette philosophy:** Black and white with a single accent. The accent is the only color that carries meaning — use it sparingly so it always lands.

```
--color-ink:       #1A1A1A   /* Primary text, borders */
--color-surface:   #FFFFFF   /* Page background */
--color-subtle:    #F5F5F5   /* Card backgrounds, subtle dividers */
--color-muted:     #999999   /* Captions, meta text, footer */
--color-accent:    #EC4523   /* Interaction only: hero link hover states, ✦ star, numbered badges */
```

**Rules:**

- Accent appears on hero link hover states (text + underline), the trailing `✦` star on company links, and numbered badges (1/2/3) on nav links — all via CSS `::after`, `font-size: 8px`, `opacity: 0.8`.
- Accent never appears as: decorative backgrounds, section dividers, illustration color.
- When in doubt, use `--color-ink` at reduced opacity rather than reaching for a new color.

---

## 4. Typography

**Playfair Display** — Hero headline, project headlines, navigation. Serif weight for editorial presence.
**Geist** — UI, body, card metadata, footer. Anything the user reads as interface or content.

```
Hero text:            Playfair Display, 48px, weight 500, line-height 52px, letter-spacing 0.96px, color #1A1A1A
Project metadata:     Geist, 14px, weight 500, color rgba(26,26,26,0.5); dot separators between company · industry · date · type
Project headline:     Playfair Display, 20px, weight 400, line-height 130%, color #1A1A1A
Section heading:      Geist, 1.25rem, weight 500, line-height 1.3
Body / narrative:     Geist, 1rem, weight 400, line-height 1.7
Caption / meta:       Geist, 0.875rem, weight 400, color --color-muted
Nav:                  Geist, 14px, weight 500, color #1a1a1a, letter-spacing 0.32px; logo only — pill links removed
Footer (Animal Garden): Geist, 14px, weight 500; text row: flex-row space-between; left col: line 1 rgba(26,26,26,0.5) — live Boston time; line 2 #1A1A1A — Fufu CTA + CatEars SVG; right col: CHANGELOG/LinkedIn/X as hero-nav-link, flex-col items-end, gap 4px
```

**Rules:**

- Never use bold weight for emphasis within body text. Use a new sentence instead.
- Never center-align body text. Left-aligned only.
- Heading hierarchy should be felt, not announced — avoid H1/H2/H3 visual jumps that feel like a document.

---

## 5. Spacing & Layout

**Philosophy:** When in doubt, add space. Padding should feel slightly more generous than necessary. The grid breathes.

```
Page horizontal pad:   24px mobile, 72px desktop (lg+) — nav, main content aligned; no max-width cap
Navbar padding:       12px vertical; 24px horizontal mobile, 72px horizontal lg+; height fit-content
Hero padding:         desktop 52px top / 64px bottom, 72px horizontal; tablet 28px top / 40px bottom; mobile 64px top/bottom, 24px horizontal; column-gap 16px; row-gap 40px
Project section pad:  24px horizontal mobile, 72px horizontal lg+; 80px bottom; 2-column masonry at lg (1024px+), 24px column-gap, 48px row-gap
Footer padding:       16px 72px (desktop/tablet); 12px 72px (mobile)
Section gap:          5rem–7rem vertical
```

**Footer garden:** First element aligns with footer text; layout uses a horizontal content band (6%–94% of footer width via `gardenX`), no padding wrapper.

**Border color:** `rgba(26,26,26,0.08)` for footer (and any remaining dividers), not `#E5E5E5`.

**Breakpoint:** Tablet and below (<1024px): projects stack in a single column. From 1024px (lg): 2-column masonry.

**Rules:** Never crowd cards — reduce columns before reducing padding. Negative space is a design element; the hero right column holds nav links (Resume/About/Extras) on desktop; on tablet and mobile they appear below the headline in a horizontal row.

---

## 6. Animation & Interaction

**Philosophy:** Motion should feel slow and deliberate — like turning a page, not a notification ping.

```
Default duration:     400ms
Default ease:         cubic-bezier(0.4, 0, 0.2, 1)   /* Material "standard" — smooth deceleration */
Hover transitions:    300ms cubic-bezier(0.4, 0, 0.2, 1)
Profile card fade:    350ms ease, slight translateY(8px) → translateY(0)
```

**Rules:**

- Every animation must have a functional reason. "It looks cool" is not a reason.
- No entrance animations on page load. Content appears immediately — animation is reserved for interaction responses.
- Hover states on cards: subtle shadow lift + scale(1.015). Never scale more than 1.02.

---

## 7. Component Voice

**Project Cards (masonry layout):** Two-column masonry from lg (1024px); each card is a single cover image + two-row text block.

```
Layout:                CSS columns: 2 at lg+, column-gap 24px; break-inside avoid; <1024px → columns: 1 (vertical stack)
Card gap:              48px vertical between cards (margin-bottom)
Image:                 width 100%, aspect-ratio from data (varies per card), object-fit cover, border 1px solid rgba(204,209,218,0.2)
Metadata row:          Geist, 14px, weight 500, rgba(26,26,26,0.5); items separated by · dot dividers (4px circle, same color); 16px above; order: company · industry · date · type
Headline:              Playfair Display, 20px, weight 400, line-height 130%, #1A1A1A; 4px below metadata
```

**Tools Cards:** Slightly more playful than project cards (vibe coding), still within grid discipline.

**"In Their Eyes" Testimonials:** Profile cards appear/disappear quietly — felt discovered, not announced.

**Navigation:** Sticky, unobtrusive. Logo only.

```
Logo:                  "Martta XU" text only; Geist, 14px, weight 500, color #1a1a1a
Pill links:            removed — Resume/About/Extras moved to hero right column
```

**Hero inline links:** Two classes, same base style (dotted underline, accent hover, `::after` badge via `position: absolute; top: 0.45em; right: -0.85em; font-size: 8px; opacity: 0.8`):

```
.hero-company-link     Company names in bio; badge content: "✦"; always visible
.hero-nav-link         Resume/About/Extras (hero) + CHANGELOG/LinkedIn/X (footer); badge content: attr(data-num) → "1"/"2"/"3"

Color:                  #1A1A1A
Hover color:            var(--color-accent)
Hover underline:        dotted, var(--color-accent)
Hover background:       rgba(236, 69, 35, 0.02)
```

---

## 8. Writing Style (for AI-generated or placeholder copy)

- Short sentences. Never more than 25 words.
- No adjective stacking. One strong word beats three weak ones.
- First person where appropriate ("I design access") — direct, not performative.
- No buzzwords: no "passionate," "innovative," "leverage," "synergy."
- Descriptions of work answer: *what was the problem, what changed because of the design* — not what tools were used.

---

## 9. How to Update This File

When a design decision is made during development, update this file as follows:

1. **Refine, don't append.** If a new rule makes an old one redundant, replace it.
2. Log decision reason in `CHANGELOG.md`, not here. All codes should be in code block, not in text

