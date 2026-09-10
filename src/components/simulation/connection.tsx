import { cn } from "@/lib/cn";
import { quadPath } from "@/lib/visuals";

export function Connection({
  from,
  to,
  open,
  dim,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  open?: boolean;
  dim?: boolean;
}) {
  return (
    <path
      d={quadPath(from, to)}
      fill="none"
      className={cn(open ? "stroke-accent" : "stroke-foreground/15")}
      strokeWidth={open ? 1.8 : 1.1}
      strokeDasharray={open ? "0" : "4 6"}
      opacity={dim ? 0.35 : 1}
    />
  );
}
