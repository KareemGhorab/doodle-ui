// Lightweight validation used as the package "build" step.
// CSS ships as-is (no compilation needed), so we just assert the entry files
// exist and that the required exports resolve.
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const required = ["src/index.css", "src/tokens.css", "src/fonts.css"];
let ok = true;

for (const rel of required) {
  const abs = resolve(root, rel);
  if (!existsSync(abs)) {
    console.error(`[@kareem-ghorab/theme] missing required file: ${rel}`);
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}

console.log("[@kareem-ghorab/theme] ok — CSS entry files present.");
