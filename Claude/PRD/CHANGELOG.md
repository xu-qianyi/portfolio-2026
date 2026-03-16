# [CHANGELOG.md](http://CHANGELOG.md)

All changes listed newest-first. One section per work session. Do not include the changes made to **[design.md](http://design.md) and master PRD.md**
Format: `[YYYY-MM-DD · Session X · <commit-hash>]` — machine-readable date + session label + git commit hash(if any).

---

## [2026-03-16 · Session Q · 87d9584] — Claw'd crab + Fufu chase behaviors + footer bug fixes

### Added

- **Claw'd (Claude crab)** — pixel-art SVG crab that spawns after Fufu idles for 2s; wanders randomly across the garden (X + Y) every 8s; evades when Fufu gets close
- **Fufu chase bubbles** — cycles through "stop!", "wait!", "hey!", "come back!" while chasing the crab
- **Fufu context-aware speech** — "~yum" near catfood (with Y-distance check), "!!" near crab, "zzz" on bed (wand-only)

### Changed

- **Fufu chase speed** — slower when chasing crab (base 0.18) vs wand (base 0.35), so crab visibly outruns Fufu
- **Crab movement** — 2s ease-in-out transitions in both X and Y; 1.4s gentle bounce animation
- **Sleep GIF** — only triggers near bed when crab is NOT active (no sleep during chase)
- **`CHASE_PHRASES`** — moved to module-level constant (was re-created every render)

### Fixed

- **Crab not reappearing after refresh** — Fufu now transitions to "arrive" when nothing to chase, restarting the idle→spawn chain
- **Fufu "yum" too early** — tightened threshold from 40px → 25px and added Y-distance check
- **ResizeObserver stale after mobile toggle** — added `[isMobile]` dependency so observer re-attaches
- **60fps no-op setState** — `setCatAState("arrive")` now uses functional update to skip redundant calls

---

## [2026-03-15 · Session P · daff36c] — Footer polish + about page copy + navbar logo

### Changed

- **Footer background** — `#ffffff` → `#f8f8f8`
- **Footer time string** — removed "(Open to relocate)"; color `rgba(26,26,26,0.5)` → `#1a1a1a`
- **About page layout** — switched to `grid lg:grid-cols-2`; added responsive padding; added right-column nav links (Resume, Work, Extras) visible on sm+
- **About page copy** — merged Swing sentence into first paragraph; simplified "path" paragraph
- **Navbar logo** — added `yin.svg` icon (18×18) beside "Martta XU" text

---

## [2026-03-15 · Session O · 0ab7ffa] — About page build

### Added

- **`portfolio/src/app/about/page.tsx`** — About page. Text section (left 50% desktop, full width tablet/below) + placeholder photo strip (6 boxes, `height: 320px`). Page hugs content height.
- **`portfolio/src/components/CopyEmail.tsx`** — "let's talk" link with CSS hover tooltip; copies `martta.xu@outlook.com` on click; checkmark confirmation state.

### Changed

- **`Shell.tsx`** — removed `minHeight: "100vh"`; pages now hug content height.

---

## [2026-03-15 · Session N · 55a6c37] — Hero nav links + footer social links + navbar simplification

### Added

- **`hero-nav-link` CSS class** — numbered badges via `content: attr(data-num)`.

### Changed

- **Navbar** — right pill links (Resume/About/Extras) removed; logo only.
- **Hero right column** — Resume/About/Extras added as numbered nav links; desktop: vertical stack right-aligned; tablet: horizontal row; mobile: hidden.
- **Footer text row** — layout `flex-row space-between`; CHANGELOG, LinkedIn, X added as `hero-nav-link` links on the right.
- **Hero padding** — desktop `52px top / 64px bottom`; tablet `28px top / 40px bottom`. Row-gap `80px → 40px`.

---

## [2026-03-15 · Session M · b5bc9ae] — Footer typography overhaul + live Boston clock + CatEars

### Changed

- **Footer font** — Playfair Display italic → Geist 14px weight 500.
- **Footer line 1** — live Boston clock `[h:mm am/pm] in Boston, MA`; updates every 60s via `Intl.DateTimeFormat`.
- **Footer line 2** — replaced emoji with inline animated `CatEars` SVG (size 32); two ears twitch independently on 12s loop.

---

## [2026-03-14 · Session K · f832c42] — Hero copy update + scroll-reveal footer

### Changed

- **Hero copy** — added "And in the curating - knowing where to linger, and where to let go."; role sentence updated; "Previously:" on new line.
- **Shell footer layout** — `AnimalGardenFooter` moved to `position: fixed` bottom; main content uses `marginBottom: footerH` (measured via `ResizeObserver`) for scroll-reveal effect.

### Fixed

- **SSR hydration flash** — `setVw(window.innerWidth)` called immediately on mount.
- **Garden width stale read** — replaced `offsetWidth` snapshot with persistent `ResizeObserver` on `gardenRef`.

---

## [2026-03-03 · Session J] — Stability hardening

### Changed

- **Runtime** — standardized on Node 22 (`.nvmrc` + `engines.node`).
- **Footer mouse tracking** — switched cursor positioning to ref-based DOM updates; eliminates high-frequency re-renders.
- **Project preview** — `datalign2` switched to local `/public/images/preview/website-placeholder.svg`.

---

## [2026-03-03 · Session I] — Project industry field + accent color

### Added

- **`industry` field** — added to all `projects.json` entries; rendered in `ProjectCard` meta row (company · industry · date · type).

### Changed

- **Accent color** — `#003966` → `#EC4523`; updated `--color-accent` in `globals.css`.

---

## [2026-03-01 · Session H · 71168c1] — Remove Ask Martta + layout alignment

### Removed

- **Ask Martta drawer** — `AskMarttaDrawer` deleted; AI button and all drawer logic removed from `Shell.tsx` and `Navbar.tsx`.

### Changed

- **Horizontal padding** — Nav, main content, and footer consistent at 72px left/right.
- **Navbar logo** — logo image removed; "Martta XU" text only, Geist 14px.
- **Footer garden alignment** — garden band aligned with footer text via `gardenX` layout offset.

---

## [2026-02-27 · Session F] — Animal Garden footer

### Added

- **Animal Garden footer** — animated pixel garden with Fufu (Cat A), Cat B, bunny, chicks, and flowers. Desktop/tablet only; mobile keeps text-only footer. Cat A: 52×52px desktop, 48×48px tablet.

---

## [2026-02-20] — Navigation redesign + accent color

### Changed

- **Accent color** — `#1087E6` → `#003966`.
- **Nav logo** — `horse.svg` → `许谦益之印_红色.svg` (28×28).
- **Nav typography** — Switzer 16px → Playfair Display 18px; pill link hover: 50% opacity.

---

## [2026-02-19 · Sessions A–D · 287ac45 / b67fd53] — Phase 1 build + design polish

### Added

- **Playfair Display** — loaded via `next/font/google` (weight 500); exposed as `--font-playfair-display`.

### Changed

- **Hero layout** — grid `minmax(0, 2fr) / minmax(0, 1fr)`, padding `64px 72px`, column-gap `16px`; Playfair Display Medium 48px / 52px line-height / 0.96px letter-spacing.
- **Image strip breakpoint** — 1200px → 1350px (`min-[1350px]:grid-cols-3`).
- **Project card** — title/description gap 8px → 2px; margin-top from image strip 16px → 24px; image border `rgba(171,171,171,0.2)` → `rgba(204,209,218,0.2)`.

### Removed

- JLL and PwC entries from `projects.json`.
