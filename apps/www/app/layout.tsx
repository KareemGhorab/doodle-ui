import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/registry/doodle/ui/sonner";

export const metadata: Metadata = {
  title: "Doodle UI — a childish shadcn/ui theme",
  description:
    "Doodle UI is a hand-drawn, childish theme for shadcn/ui: blob border-radii, Neucha + Cabin Sketch fonts, light and dark modes. Install via npm + the shadcn CLI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
