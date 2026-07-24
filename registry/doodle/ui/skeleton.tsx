import { cn } from "@/registry/doodle/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse doodle-radius-card bg-accent", className)}
      {...props}
    />
  )
}

export { Skeleton }
