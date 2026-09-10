import { cn } from "@/lib/cn";

export function Boundary({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("relative rounded-3xl hairline", className)}>
      <p className="absolute left-4 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      {children}
    </section>
  );
}
