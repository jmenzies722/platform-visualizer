"use client";

import {
  Box,
  CircuitBoard,
  Cpu,
  Database,
  Globe,
  HardDrive,
  Layers,
  Monitor,
  Network,
  Server,
  Shield,
  Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { NodeKind, NodeStateValue, SimNode } from "@/lib/types";
import { nodeAccent } from "@/lib/visuals";
import { LatencyBadge } from "@/components/simulation/latency-badge";
import { StateBadge } from "@/components/simulation/state-badge";

const icons: Record<NodeKind, LucideIcon> = {
  client: Monitor,
  cache: HardDrive,
  resolver: Globe,
  dns: Globe,
  router: Waypoints,
  server: Server,
  process: Box,
  gpu: Cpu,
  control: CircuitBoard,
  storage: Database,
  queue: Layers,
  gateway: Shield,
  runtime: Cpu,
  network: Network,
  identity: Shield,
};

export function SystemNode({
  node,
  state,
  highlighted,
  selected,
  latency,
  onSelect,
}: {
  node: SimNode;
  state?: Record<string, NodeStateValue>;
  highlighted?: boolean;
  selected?: boolean;
  latency?: number;
  onSelect: (id: string) => void;
}) {
  if (state?.visible === false) return null;
  const Icon = icons[node.kind];
  const accent = nodeAccent[node.kind];
  const status = typeof state?.status === "string" ? state.status : undefined;
  const extra = Object.entries(state ?? {})
    .filter(([key]) => !["status", "visible", "util"].includes(key))
    .slice(0, 2);

  return (
    <button
      type="button"
      data-node-id={node.id}
      onClick={() => onSelect(node.id)}
      className={cn(
        "absolute z-10 w-[154px] -translate-x-1/2 -translate-y-1/2 rounded-2xl px-2.5 py-2 text-left transition duration-300",
        "hairline glass",
        highlighted || selected ? "node-glow" : "hover:bg-white/5",
      )}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <div className="flex items-start gap-2.5">
        <span
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `${accent}22`, color: accent }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium tracking-tight">
            {node.label}
          </span>
          <span className="block truncate font-mono text-[10px] text-muted-foreground">
            {node.subtitle}
          </span>
        </span>
      </div>
      {typeof state?.util === "number" ? (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-foreground/10">
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{
              width: `${Math.max(4, Math.min(100, Number(state.util)))}%`,
              background: accent,
            }}
          />
        </div>
      ) : null}
      <div className="mt-2 flex flex-wrap gap-1">
        {status ? <StateBadge value={status} /> : null}
        {typeof latency === "number" ? <LatencyBadge ms={latency} /> : null}
        {extra.map(([key, value]) => (
          <StateBadge key={key} value={`${key} ${value}`} muted />
        ))}
      </div>
    </button>
  );
}
