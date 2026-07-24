"use client";

import { CopyButton } from "@/components/copy-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/registry/doodle/ui/button";

const INSTALL = "npx shadcn@latest add @doodle-ui/button";

export function SiteHero() {
  return (
    <header className="relative overflow-hidden border-b-2 border-border">
      {/* hand-drawn atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpath d='M10 30 Q 30 10 50 30 T 90 30' fill='none' stroke='%23333' stroke-width='2'/%3E%3Ccircle cx='90' cy='80' r='14' fill='none' stroke='%23333' stroke-width='2'/%3E%3Cpath d='M15 90 l 20 -8 l -4 18 z' fill='none' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E\")",
          backgroundSize: "220px 220px",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-20 md:py-28">
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl">Doodle UI</span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/KareemGhorab/doodle-ui"
              className="text-sm underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            <ModeToggle />
          </div>
        </div>

        <h1 className="font-display text-6xl leading-[0.95] md:text-8xl">
          shadcn/ui,
          <br />
          but hand-drawn.
        </h1>

        <p className="max-w-xl text-xl text-muted-foreground">
          Doodle UI is a childish, sketchy theme for shadcn/ui — wobbly blob
          corners, the Neucha and Cabin Sketch fonts, and full light + dark
          support. Every component, restyled.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 border-2 border-border doodle-radius-input bg-card px-4 py-2 font-mono text-sm">
            <span className="text-muted-foreground">$</span>
            <code>{INSTALL}</code>
            <CopyButton value={INSTALL} className="ml-1" />
          </div>
          <Button size="lg" asChild>
            <a href="#components">Browse components</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
