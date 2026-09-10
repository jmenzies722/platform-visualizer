"use client";

import { packetColor } from "@/lib/visuals";
import type { PacketKind } from "@/lib/types";

export function AnimatedPacket({
  x,
  y,
  label,
  kind,
}: {
  x: number;
  y: number;
  label: string;
  kind: PacketKind;
}) {
  const color = packetColor[kind];
  return (
    <div
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="flex flex-col items-center">
        <span
          className="packet-core h-2.5 w-2.5 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 16px ${color}`,
          }}
        />
        <span
          className="mt-1 max-w-[180px] truncate rounded-full px-2 py-0.5 font-mono text-[9px] text-white"
          style={{ background: `${color}ee` }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
