import { cn } from "@/lib/cn";

export function StateBadge({
  value,
  muted,
}: {
  value: string;
  muted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full truncate rounded-md px-1.5 py-0.5 font-mono text-[9px] tracking-wide",
        muted
          ? "bg-foreground/5 text-muted-foreground"
          : "bg-accent/12 text-foreground",
      )}
    >
      {value}
    </span>
  );
}
