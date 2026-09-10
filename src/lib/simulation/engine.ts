import type {
  ActivePacket,
  NodeStateValue,
  SimEvent,
  SimStep,
  SimulationDefinition,
} from "@/lib/types";

export const SPEEDS = [0.5, 1, 2] as const;
export type Speed = (typeof SPEEDS)[number];

export function cloneStates(
  states: Record<string, Record<string, NodeStateValue>> = {},
): Record<string, Record<string, NodeStateValue>> {
  const next: Record<string, Record<string, NodeStateValue>> = {};
  for (const [id, patch] of Object.entries(states)) {
    next[id] = { ...patch };
  }
  return next;
}

export function mergeState(
  states: Record<string, Record<string, NodeStateValue>>,
  nodeId: string,
  patch: Record<string, NodeStateValue>,
) {
  const current = states[nodeId] ?? {};
  states[nodeId] = { ...current, ...patch };
}

export function eventsAt(step: SimStep, elapsed: number, previous = -1) {
  return step.events.filter((event) => {
    const delay = eventDelay(event);
    return delay > previous && delay <= elapsed;
  });
}

export function eventDelay(event: SimEvent) {
  return "delay" in event && typeof event.delay === "number" ? event.delay : 0;
}

export function packetDuration(event: Extract<SimEvent, { type: "packet" }>) {
  return event.duration ?? 900;
}

export function applyInstantEvents(
  definition: SimulationDefinition,
  step: SimStep,
  states: Record<string, Record<string, NodeStateValue>>,
) {
  const highlights: string[] = [];
  const connections = new Set<string>();
  const latencies: Record<string, number> = {};
  let caption = step.explanation;

  for (const event of step.events) {
    if (eventDelay(event) > 0) continue;
    if (event.type === "state") mergeState(states, event.nodeId, event.patch);
    if (event.type === "highlight") highlights.push(...event.nodeIds);
    if (event.type === "explain") caption = event.text;
    if (event.type === "connection" && event.open) connections.add(event.edgeId);
    if (event.type === "latency" && event.ms != null) latencies[event.nodeId] = event.ms;
  }

  return { highlights, connections, latencies, caption };
}

export function spawnPacket(
  event: Extract<SimEvent, { type: "packet" }>,
  now: number,
  index: number,
): ActivePacket {
  return {
    id: `${event.from}-${event.to}-${now}-${index}`,
    from: event.from,
    to: event.to,
    label: event.label,
    kind: event.kind,
    progress: 0,
    startedAt: now,
    duration: packetDuration(event),
  };
}

export function stepById(definition: SimulationDefinition, id: string) {
  return definition.steps.find((step) => step.id === id);
}

export function nextIndex(current: number, total: number) {
  return Math.min(current + 1, total - 1);
}

export function prevIndex(current: number) {
  return Math.max(current - 1, 0);
}
