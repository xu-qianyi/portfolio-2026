# Design System

All tokens and shared components live in `src/components/CaseStudy.tsx`.

---

## Typography

Two families. Tiempos is editorial — headings only. Geist is everything else.

| Token | Size | Family | Weight | Where |
|---|---|---|---|---|
| `CASE_H1` | 28px | Tiempos | 500 | Page title |
| `CASE_H2` | 24px | Tiempos | 500 | Section heading (after divider) |
| `CASE_H3` | 20px | Tiempos | 500 | Component heading — feature names, design decision titles |
| `<SubHeading>` | 18px | Geist | 550 | Sub-section — "The challenge", "Key findings" |
| `CASE_BODY` | 15px | Geist | 400 | Body prose |
| `CASE_CAPTION` | 13px | Geist | 400 | Image captions, card body text |
| `CASE_LABEL` | 11px | Geist | 500 · uppercase | Small labels inside components |
| `CASE_EYEBROW` | 10px | Geist | 500 · uppercase | Page top label ("NARS × LookLook / User Research") |
| `CASE_STAT` | 36px | Geist | 400 | Impact numbers |

**Rule:** serif stops at H3. SubHeading and below → Geist.

---

## Color

Base ink: `#1A1A1A`. All shades are transparency layers of it — dark mode friendly.

| Variable | Opacity | Use |
|---|---|---|
| `--color-ink` | 100% | Headings, strong text |
| `--color-ink-80` | 80% | Body text, card titles |
| `--color-ink-70` | 70% | Secondary info |
| `--color-ink-65` | 65% | Meta values (Role, Team, Timeline) |
| `--color-ink-50` | 50% | Captions, card body, secondary content |
| `--color-ink-40` | 40% | Very faint — step numbers "01"/"02" |
| `--color-ink-14` | 14% | Borders, dividers |
| `--color-ink-06` | 6% | Subtle background fills |
| `--color-muted` | — | `#737373` — nav inactive states only |

`--color-muted` is a flat gray for UI chrome. `--color-ink-50` is for content text. They look similar but serve different purposes — don't swap them.

---

## Spacing between blocks

```
Section start:               pt-16 (64px)
SectionDivider → H2:         divider mb-4 + h2 marginTop: 0
H2 → first paragraph:        h2 marginBottom: 1rem (16px)
SubHeading → paragraph:      flex gap-3 (12px)
Paragraph → paragraph:       flex gap-3.5 (14px)
Between sub-sections:        mt-8 (32px)
Between major components:    mt-12 / mt-16 (48–64px)
```

---

## Shared components

```tsx
<SectionDivider label="Overview" />
<SubHeading>The challenge</SubHeading>           // h3 by default
<SubHeading as="h2">...</SubHeading>             // override tag
<SubHeading style={{ marginTop: "2rem" }}>       // extra styles
<CaseMetaGrid items={META_ITEMS} />              // Role / Team / Timeline grid
```

---

## Adding new styles

Before writing any inline `fontSize` or `color` — check if a token covers it.
Only go inline when the value is truly one-off (e.g. a specific badge background).
