#!/usr/bin/env node
/*
 * doodlefy — restyle the forked shadcn components with the Doodle UI look.
 *
 * Primary transform: replace uniform Tailwind corner-radius utilities
 * (rounded, rounded-sm ... rounded-3xl, and optionally rounded-full) with the
 * matching `doodle-radius-*` utility for that component's surface type. The
 * doodle utilities are provided by @doodle-ui/theme and reference the organic,
 * hand-drawn blob radii that define the theme.
 *
 * A small set of form controls also get a heavier 2px ink outline to echo the
 * original theme's chunky borders.
 *
 * The transform is class-token based (whole-word) so it never touches JSX,
 * props, or component APIs.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve, basename } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const uiDir = resolve(here, "..", "registry", "doodle", "ui");

// Map each component file to its primary blob-radius token.
// `full: true` also converts `rounded-full` (used for genuinely organic circles
// like avatars); otherwise rounded-full is left intact (switches, sliders,
// progress tracks, radio dots stay cleanly pill/circular).
const MAP = {
  // buttons + button-like
  "button.tsx": { token: "button" },
  "button-group.tsx": { token: "button" },
  "toggle.tsx": { token: "button" },
  "toggle-group.tsx": { token: "button" },
  "pagination.tsx": { token: "button" },
  // form controls
  "input.tsx": { token: "input", border2: true },
  "textarea.tsx": { token: "input", border2: true },
  "input-otp.tsx": { token: "input" },
  "input-group.tsx": { token: "input" },
  "native-select.tsx": { token: "input", border2: true },
  "select.tsx": { token: "input" },
  "combobox.tsx": { token: "input" },
  "field.tsx": { token: "input" },
  "calendar.tsx": { token: "input" },
  "checkbox.tsx": { token: "pill" },
  // cards + containers
  "card.tsx": { token: "card" },
  "alert.tsx": { token: "card" },
  "table.tsx": { token: "card" },
  "item.tsx": { token: "card" },
  "empty.tsx": { token: "card" },
  "accordion.tsx": { token: "card" },
  "skeleton.tsx": { token: "card" },
  "chart.tsx": { token: "card" },
  "sidebar.tsx": { token: "card" },
  "sonner.tsx": { token: "card" },
  "message.tsx": { token: "card" },
  "message-scroller.tsx": { token: "card" },
  "attachment.tsx": { token: "card" },
  // overlays
  "dialog.tsx": { token: "modal" },
  "alert-dialog.tsx": { token: "modal" },
  "sheet.tsx": { token: "modal" },
  "drawer.tsx": { token: "modal" },
  "bubble.tsx": { token: "modal" },
  // popovers / menus
  "popover.tsx": { token: "popover" },
  "dropdown-menu.tsx": { token: "popover" },
  "context-menu.tsx": { token: "popover" },
  "menubar.tsx": { token: "popover" },
  "hover-card.tsx": { token: "popover" },
  "tooltip.tsx": { token: "popover" },
  "command.tsx": { token: "popover" },
  // navigation
  "navigation-menu.tsx": { token: "nav" },
  "tabs.tsx": { token: "nav" },
  "breadcrumb.tsx": { token: "nav" },
  // media
  "avatar.tsx": { token: "avatar", full: true },
  "aspect-ratio.tsx": { token: "media" },
  "carousel.tsx": { token: "media" },
  // small pill-ish
  "badge.tsx": { token: "badge" },
  "kbd.tsx": { token: "badge" },
  "marker.tsx": { token: "badge" },
  "progress.tsx": { token: "pill" },
  "slider.tsx": { token: "pill" },
  "scroll-area.tsx": { token: "pill" },
  "resizable.tsx": { token: "pill" },
};

// Default for anything not explicitly mapped.
const DEFAULT = { token: "card" };

const RADIUS_TOKENS = [
  "rounded-3xl",
  "rounded-2xl",
  "rounded-xl",
  "rounded-lg",
  "rounded-md",
  "rounded-sm",
  "rounded-xs",
  "rounded", // bare, last so longer variants match first
];

function replaceRadii(source, doodleClass, includeFull) {
  let out = source;
  for (const tok of RADIUS_TOKENS) {
    // Whole class token: preceded by a class boundary (quote, backtick, space,
    // bracket) and followed by one. Never matches directional (rounded-t-*)
    // because those have an extra segment before the boundary.
    const re = new RegExp(`(^|[\\s"'\`])${tok}(?=[\\s"'\`])`, "g");
    out = out.replace(re, (_m, pre) => `${pre}${doodleClass}`);
  }
  if (includeFull) {
    const re = new RegExp(`(^|[\\s"'\`])rounded-full(?=[\\s"'\`])`, "g");
    out = out.replace(re, (_m, pre) => `${pre}${doodleClass}`);
  }
  // Collapse accidental double application (e.g. base + size both mapped and
  // adjacent) — keep it tidy.
  out = out.replace(
    new RegExp(`(${doodleClass})(\\s+\\1)+`, "g"),
    "$1"
  );
  return out;
}

function bumpBorders(source) {
  // Turn the default 1px `border border-input` on form controls into a chunkier
  // 2px ink outline, matching the original theme's inputs.
  return source
    .replace(/(^|[\s"'`])border border-input(?=[\s"'`])/g, "$1border-2 border-input")
    .replace(/(^|[\s"'`])border-input border(?=[\s"'`])/g, "$1border-2 border-input");
}

let changed = 0;
const files = readdirSync(uiDir).filter((f) => f.endsWith(".tsx"));

for (const file of files) {
  const cfg = MAP[file] ?? DEFAULT;
  const doodleClass = `doodle-radius-${cfg.token}`;
  const abs = join(uiDir, file);
  const before = readFileSync(abs, "utf8");
  let after = replaceRadii(before, doodleClass, Boolean(cfg.full));
  if (cfg.border2) after = bumpBorders(after);
  if (after !== before) {
    writeFileSync(abs, after, "utf8");
    changed += 1;
    console.log(`  doodlefied ${basename(file)} -> ${doodleClass}`);
  }
}

console.log(`\nDone. Restyled ${changed}/${files.length} components.`);
