#!/usr/bin/env node
/*
 * Generate the root registry.json for the @doodle-ui registry.
 *
 * Scans registry/doodle/{ui,hooks,lib} and produces one registry item per
 * file, inferring:
 *   - npm `dependencies` from bare import specifiers
 *   - `registryDependencies` from `@/registry/doodle/{ui,hooks,lib}` imports
 *
 * Also prepends the `doodle` style item that carries the light/dark theme and
 * depends on @doodle-ui/theme.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const registryRoot = join(root, "registry", "doodle");
const uiDir = join(registryRoot, "ui");
const hooksDir = join(registryRoot, "hooks");
const libDir = join(registryRoot, "lib");
const blocksDir = join(registryRoot, "blocks");

const THEME_PKG = "@kareem-ghorab/theme";

// Bare specifiers we never want to list as installable deps.
const IGNORE_DEPS = new Set(["react", "react-dom", "next"]);

function toPackageName(spec) {
  if (spec.startsWith("@")) {
    // scoped: @scope/name[/subpath] -> @scope/name
    const parts = spec.split("/");
    return parts.slice(0, 2).join("/");
  }
  // name[/subpath] -> name
  return spec.split("/")[0];
}

const IMPORT_RE =
  /(?:import|export)[^'"]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]/g;

function parseImports(source) {
  const specs = new Set();
  let m;
  while ((m = IMPORT_RE.exec(source))) {
    const spec = m[1] ?? m[2];
    if (spec) specs.add(spec);
  }
  return [...specs];
}

function analyze(source) {
  const deps = new Set([THEME_PKG]); // components need the theme's tokens/utils
  const registryDeps = new Set();

  for (const spec of parseImports(source)) {
    if (spec.startsWith("@/registry/doodle/ui/")) {
      registryDeps.add(spec.replace("@/registry/doodle/ui/", ""));
    } else if (spec.startsWith("@/registry/doodle/hooks/")) {
      registryDeps.add(spec.replace("@/registry/doodle/hooks/", ""));
    } else if (spec.startsWith("@/registry/doodle/blocks/")) {
      registryDeps.add(spec.replace("@/registry/doodle/blocks/", ""));
    } else if (spec.startsWith("@/registry/doodle/lib/")) {
      const name = spec.replace("@/registry/doodle/lib/", "");
      if (name !== "utils") registryDeps.add(name);
    } else if (spec.startsWith(".") || spec.startsWith("@/")) {
      // relative / other local alias — ignore
    } else {
      const pkg = toPackageName(spec);
      if (!IGNORE_DEPS.has(pkg)) deps.add(pkg);
    }
  }
  return { deps: [...deps].sort(), registryDeps: [...registryDeps].sort() };
}

function titleFrom(name) {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const items = [];

// --- doodle style item (theme carrier) ---
const light = {
  background: "#ffffff",
  foreground: "#333333",
  card: "#ffffff",
  "card-foreground": "#333333",
  popover: "#ffffff",
  "popover-foreground": "#333333",
  primary: "#333333",
  "primary-foreground": "#ffffff",
  secondary: "#e5e5e5",
  "secondary-foreground": "#333333",
  muted: "#f0efef",
  "muted-foreground": "#6b6b6b",
  accent: "#e5e5e5",
  "accent-foreground": "#333333",
  destructive: "#d64545",
  "destructive-foreground": "#ffffff",
  border: "#333333",
  input: "#333333",
  ring: "#d4d0d4",
  radius: "0.5rem",
};
const dark = {
  background: "#1c1b1f",
  foreground: "#f2f0f0",
  card: "#242329",
  "card-foreground": "#f2f0f0",
  popover: "#242329",
  "popover-foreground": "#f2f0f0",
  primary: "#f5f5f5",
  "primary-foreground": "#1c1b1f",
  secondary: "#2c2b31",
  "secondary-foreground": "#f2f0f0",
  muted: "#2c2b31",
  "muted-foreground": "#a8a5ad",
  accent: "#34333a",
  "accent-foreground": "#f2f0f0",
  destructive: "#e2686b",
  "destructive-foreground": "#1c1b1f",
  border: "#e5e5e5",
  input: "#e5e5e5",
  ring: "#5a5860",
};

items.push({
  name: "doodle",
  type: "registry:style",
  title: "Doodle",
  description:
    "The Doodle UI base style: childish, hand-drawn theme with light and dark tokens, Neucha + Cabin Sketch fonts, and the signature blob border-radius system.",
  dependencies: [THEME_PKG],
  cssVars: { light, dark },
  css: {
    "@import": "@kareem-ghorab/theme/styles.css",
  },
});

// --- lib items ---
for (const file of readdirSync(libDir).filter((f) => /\.(t|j)sx?$/.test(f))) {
  const name = file.replace(/\.(t|j)sx?$/, "");
  items.push({
    name,
    type: "registry:lib",
    title: titleFrom(name),
    files: [{ path: `registry/doodle/lib/${file}`, type: "registry:lib" }],
  });
}

// --- hook items ---
for (const file of readdirSync(hooksDir).filter((f) => /\.(t|j)sx?$/.test(f))) {
  const name = file.replace(/\.(t|j)sx?$/, "");
  const { deps, registryDeps } = analyze(readFileSync(join(hooksDir, file), "utf8"));
  items.push({
    name,
    type: "registry:hook",
    title: titleFrom(name),
    ...(deps.length ? { dependencies: deps } : {}),
    ...(registryDeps.length ? { registryDependencies: registryDeps } : {}),
    files: [{ path: `registry/doodle/hooks/${file}`, type: "registry:hook" }],
  });
}

// --- ui items ---
for (const file of readdirSync(uiDir).filter((f) => f.endsWith(".tsx")).sort()) {
  const name = file.replace(/\.tsx$/, "");
  const { deps, registryDeps } = analyze(readFileSync(join(uiDir, file), "utf8"));
  items.push({
    name,
    type: "registry:ui",
    title: titleFrom(name),
    description: `${titleFrom(name)} component, restyled with the Doodle UI theme.`,
    ...(deps.length ? { dependencies: deps } : {}),
    ...(registryDeps.length ? { registryDependencies: registryDeps } : {}),
    files: [{ path: `registry/doodle/ui/${file}`, type: "registry:ui" }],
  });
}

// --- block items ---
if (existsSync(blocksDir)) {
  for (const file of readdirSync(blocksDir)
    .filter((f) => f.endsWith(".tsx"))
    .sort()) {
    const name = file.replace(/\.tsx$/, "");
    const { deps, registryDeps } = analyze(
      readFileSync(join(blocksDir, file), "utf8")
    );
    items.push({
      name,
      type: "registry:block",
      title: titleFrom(name),
      description: `${titleFrom(name)} block, composed with Doodle UI components.`,
      ...(deps.length ? { dependencies: deps } : {}),
      ...(registryDeps.length ? { registryDependencies: registryDeps } : {}),
      files: [
        { path: `registry/doodle/blocks/${file}`, type: "registry:block" },
      ],
    });
  }
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "doodle-ui",
  homepage: "https://doodle-ui.vercel.app",
  items,
};

writeFileSync(
  join(root, "registry.json"),
  JSON.stringify(registry, null, 2) + "\n",
  "utf8"
);

console.log(
  `Wrote registry.json with ${items.length} items ` +
    `(1 style, ${readdirSync(libDir).length} lib, ${readdirSync(hooksDir).length} hook, ${
      items.filter((i) => i.type === "registry:ui").length
    } ui, ${items.filter((i) => i.type === "registry:block").length} block).`
);
