import { Gallery } from "@/components/gallery";
import { SiteHero } from "@/components/site-hero";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteHero />
      <Gallery />
      <footer className="border-t-2 border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="font-display text-lg text-foreground">
            Doodle UI
          </span>
          <span>
            Built on shadcn/ui · theme via{" "}
            <code className="font-mono">@kareem-hany/theme</code>
          </span>
        </div>
      </footer>
    </main>
  );
}
