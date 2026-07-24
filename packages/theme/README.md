# @kareem-ghorab/theme

Childish, hand-drawn design tokens for [Doodle UI](https://github.com/KareemGhorab/doodle-ui) — a themed fork of [shadcn/ui](https://ui.shadcn.com).

This package ships the shared visual DNA:

- **Light + dark** CSS variables mapped onto the shadcn/ui token contract
- **Neucha** (body) and **Cabin Sketch** (display) fonts
- The signature **blob border-radius** system (`--doodle-radius-*`) plus ready-made utility classes
- A chalky **focus glow** helper

The actual components are distributed separately via the `@doodle-ui` shadcn registry. This package just carries the theme so it can be shared, versioned, and reused.

## Install

```bash
npm i @kareem-ghorab/theme
```

## Usage (Tailwind CSS v4)

Import the stylesheet once in your global CSS, after Tailwind:

```css
@import "tailwindcss";
@import "@kareem-ghorab/theme/styles.css";
```

That gives you:

- `:root` (light) and `.dark` token sets
- `bg-primary`, `text-muted-foreground`, `border-border`, etc. resolving to doodle tokens
- `font-sans` → Neucha, `font-display` → Cabin Sketch
- Blob-radius utilities: `.doodle-radius-button`, `.doodle-radius-card`, `.doodle-radius-input`, `.doodle-radius-modal`, `.doodle-radius-nav`, `.doodle-radius-media`, `.doodle-radius-popover`, `.doodle-radius-pill`, `.doodle-radius-badge`, `.doodle-radius-avatar`
- `.doodle-focus-glow` for the 5px chalky focus halo

### Dark mode

Tokens use the standard shadcn class strategy. Toggle by putting `dark` on `<html>` (or use [`next-themes`](https://github.com/pacocoursey/next-themes)):

```tsx
<html lang="en" className="dark">
```

## Usage without Tailwind

If you are not on Tailwind v4, import just the raw variables:

```css
@import "@kareem-ghorab/theme/tokens.css";
@import "@kareem-ghorab/theme/fonts.css";
```

Then reference `var(--primary)`, `var(--doodle-radius-card)`, and friends directly.

## Tokens

| Group | Variables |
|-------|-----------|
| Surfaces | `--background`, `--foreground`, `--card`, `--popover` (+ `-foreground`) |
| Intent | `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive` (+ `-foreground`) |
| Lines | `--border`, `--input`, `--ring` |
| Blob radii | `--doodle-radius-{button,card,input,modal,nav,media,popover,pill,badge,avatar}` |
| Fonts | `--font-doodle-body`, `--font-doodle-display` |
| Focus | `--doodle-focus-glow` |

## License

MIT
