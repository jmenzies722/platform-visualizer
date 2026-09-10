import type { NodeKind, PacketKind } from "@/lib/types";

export const packetColor: Record<PacketKind, string> = {
  query: "#5eb1ff",
  response: "#3dd68c",
  syn: "#7aa2ff",
  ack: "#8ec5ff",
  data: "#67e8f9",
  tls: "#c4b5fd",
  http: "#fbbf24",
  token: "#f0abfc",
  control: "#a1a1aa",
  error: "#ff7a75",
  prompt: "#38bdf8",
};

export const nodeAccent: Record<NodeKind, string> = {
  client: "#7aa2ff",
  cache: "#fbbf24",
  resolver: "#38bdf8",
  dns: "#818cf8",
  router: "#22d3ee",
  server: "#34d399",
  process: "#a78bfa",
  gpu: "#f472b6",
  control: "#94a3b8",
  storage: "#fb923c",
  queue: "#facc15",
  gateway: "#60a5fa",
  runtime: "#2dd4bf",
  network: "#38bdf8",
  identity: "#f87171",
};

export function quadPoint(
  from: { x: number; y: number },
  to: { x: number; y: number },
  t: number,
) {
  const mid = {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2 - Math.min(12, Math.abs(to.x - from.x) * 0.12 + 6),
  };
  const inv = 1 - t;
  return {
    x: inv * inv * from.x + 2 * inv * t * mid.x + t * t * to.x,
    y: inv * inv * from.y + 2 * inv * t * mid.y + t * t * to.y,
  };
}

export function quadPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  const mid = {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2 - Math.min(12, Math.abs(to.x - from.x) * 0.12 + 6),
  };
  return `M ${from.x} ${from.y} Q ${mid.x} ${mid.y} ${to.x} ${to.y}`;
}
