"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/registry/doodle/lib/utils";

export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  return (
    <button
      type="button"
      aria-label="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center border-2 border-input doodle-radius-button transition-colors hover:bg-accent",
        className
      )}
    >
      {copied ? (
        <Check className="size-4" />
      ) : (
        <Copy className="size-4" />
      )}
    </button>
  );
}
