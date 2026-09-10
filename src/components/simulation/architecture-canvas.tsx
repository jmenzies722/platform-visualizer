"use client";

import { AnimatedPacket } from "@/components/simulation/animated-packet";
import { Connection } from "@/components/simulation/connection";
import { NetworkZone } from "@/components/simulation/network-zone";
import { SystemNode } from "@/components/simulation/system-node";
import type {
  ActivePacket,
  NodeStateValue,
  SimEdge,
  SimNode,
  SimZone,
} from "@/lib/types";
import { quadPoint } from "@/lib/visuals";

function center(node: SimNode) {
  return { x: node.x, y: node.y };
}

export function ArchitectureCanvas({
  nodes,
  edges,
  zones = [],
  packets,
  nodeStates,
  highlights,
  openConnections,
  latencies,
  selectedNodeId,
  caption,
  autoExplain,
  onSelectNode,
}: {
  nodes: SimNode[];
  edges: SimEdge[];
  zones?: SimZone[];
  packets: ActivePacket[];
  nodeStates: Record<string, Record<string, NodeStateValue>>;
  highlights: string[];
  openConnections: string[];
  latencies: Record<string, number>;
  selectedNodeId: string | null;
  caption: string;
  autoExplain: boolean;
  onSelectNode: (id: string) => void;
}) {
  const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));

  return (
    <div className="relative h-[min(52vh,560px)] min-h-[360px] overflow-hidden rounded-[28px] canvas-grid hairline">
      {zones.map((zone) => (
        <NetworkZone key={zone.id} zone={zone} />
      ))}

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {edges.map((edge) => {
          const from = byId[edge.from];
          const to = byId[edge.to];
          if (!from || !to) return null;
          return (
            <Connection
              key={edge.id}
              from={center(from)}
              to={center(to)}
              open={openConnections.includes(edge.id)}
              dim={
                highlights.length > 0 &&
                !highlights.includes(edge.from) &&
                !highlights.includes(edge.to)
              }
            />
          );
        })}
      </svg>

      {nodes.map((node) => (
        <SystemNode
          key={node.id}
          node={node}
          state={nodeStates[node.id]}
          highlighted={highlights.includes(node.id)}
          selected={selectedNodeId === node.id}
          latency={latencies[node.id]}
          onSelect={onSelectNode}
        />
      ))}

      {packets.map((packet) => {
        const from = byId[packet.from];
        const to = byId[packet.to];
        if (!from || !to) return null;
        const point = quadPoint(center(from), center(to), packet.progress);
        return (
          <AnimatedPacket
            key={packet.id}
            x={point.x}
            y={point.y}
            label={packet.label}
            kind={packet.kind}
          />
        );
      })}

      {autoExplain ? (
        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-30 md:inset-x-8">
          <div className="glass hairline rounded-2xl px-4 py-3 md:px-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              What’s happening
            </p>
            <p className="mt-1 text-sm leading-relaxed md:text-base">{caption}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
