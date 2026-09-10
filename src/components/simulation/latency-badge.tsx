export function LatencyBadge({ ms }: { ms: number }) {
  return (
    <span className="inline-flex rounded-md bg-good/12 px-1.5 py-0.5 font-mono text-[9px] text-good">
      {ms < 1 ? `${ms.toFixed(1)}ms` : `${Math.round(ms)}ms`}
    </span>
  );
}
