export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[28px] canvas-grid hairline md:min-h-[560px]">
      <div className="absolute inset-10 rounded-[24px] border border-dashed border-foreground/10" />
      <div className="relative max-w-md px-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Simulation coming next
        </p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The canvas for this concept is not built yet. Live simulations set
          the quality bar — this page is reserved so the curriculum stays
          honest.
        </p>
      </div>
    </div>
  );
}
