import { Connection } from "@/components/simulation/connection";

export function DataFlow({
  from,
  to,
  active,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  active?: boolean;
}) {
  return <Connection from={from} to={to} open={active} />;
}
