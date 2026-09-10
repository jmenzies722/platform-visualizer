import type { SimZone } from "@/lib/types";

const tones: Record<NonNullable<SimZone["kind"]>, string> = {
  network: "rgba(56,189,248,0.06)",
  cluster: "rgba(167,139,250,0.06)",
  host: "rgba(148,163,184,0.07)",
  vram: "rgba(244,114,182,0.07)",
  public: "rgba(52,211,153,0.06)",
  private: "rgba(96,165,250,0.06)",
  control: "rgba(250,204,21,0.05)",
};

export function NetworkZone({ zone }: { zone: SimZone }) {
  return (
    <div
      className="pointer-events-none absolute rounded-3xl"
      style={{
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: `${zone.width}%`,
        height: `${zone.height}%`,
        background: tones[zone.kind ?? "host"],
        boxShadow: "inset 0 0 0 1px var(--border)",
      }}
    >
      <div className="px-3 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {zone.label}
      </div>
    </div>
  );
}
