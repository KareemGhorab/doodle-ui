import type { NextConfig } from "next";
import { join } from "node:path";

// The registry component source lives at the monorepo root (../../registry),
// outside this app directory. Point Turbopack + file tracing at the repo root
// so those files transpile cleanly when imported via the `@/registry/*` alias.
const monorepoRoot = join(__dirname, "..", "..");

const nextConfig: NextConfig = {
  turbopack: {
    root: monorepoRoot,
  },
  outputFileTracingRoot: monorepoRoot,
  transpilePackages: ["@kareem-ghorab/theme"],
};

export default nextConfig;
