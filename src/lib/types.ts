export type NodeKind =
  | "client"
  | "cache"
  | "resolver"
  | "dns"
  | "router"
  | "server"
  | "process"
  | "gpu"
  | "control"
  | "storage"
  | "queue"
  | "gateway"
  | "runtime"
  | "network"
  | "identity";

export type PacketKind =
  | "query"
  | "response"
  | "syn"
  | "ack"
  | "data"
  | "tls"
  | "http"
  | "token"
  | "control"
  | "error"
  | "prompt";

export type RelatedRef = {
  label: string;
  slug?: string;
};

export type InspectorInfo = {
  what: string;
  receives: string;
  returns: string;
  why: string;
  related: RelatedRef[];
};

export type NodeStateValue = string | number | boolean | null;

export type SimNode = {
  id: string;
  label: string;
  subtitle?: string;
  x: number;
  y: number;
  kind: NodeKind;
  inspector: InspectorInfo;
  badge?: string;
};

export type SimEdge = {
  id: string;
  from: string;
  to: string;
  bidirectional?: boolean;
};

export type SimZone = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  kind?: "network" | "cluster" | "host" | "vram" | "public" | "private" | "control";
};

export type SimPacketEvent = {
  type: "packet";
  from: string;
  to: string;
  label: string;
  kind: PacketKind;
  delay?: number;
  duration?: number;
};

export type SimStateEvent = {
  type: "state";
  nodeId: string;
  patch: Record<string, NodeStateValue>;
  delay?: number;
};

export type SimExplainEvent = {
  type: "explain";
  text: string;
  delay?: number;
};

export type SimHighlightEvent = {
  type: "highlight";
  nodeIds: string[];
  delay?: number;
};

export type SimConnectEvent = {
  type: "connection";
  edgeId: string;
  open: boolean;
  delay?: number;
};

export type SimLatencyEvent = {
  type: "latency";
  nodeId: string;
  ms: number | null;
  delay?: number;
};

export type SimEvent =
  | SimPacketEvent
  | SimStateEvent
  | SimExplainEvent
  | SimHighlightEvent
  | SimConnectEvent
  | SimLatencyEvent;

export type SimStep = {
  id: string;
  title: string;
  explanation: string;
  duration: number;
  events: SimEvent[];
};

export type SimControlOption = {
  label: string;
  value: string;
};

export type SimSelectControl = {
  id: string;
  label: string;
  options: SimControlOption[];
  defaultValue: string;
};

export type ControlEffect = {
  states: Record<string, Record<string, NodeStateValue>>;
  caption?: string;
};

export type SimulationDefinition = {
  id: string;
  canvas?: { width: number; height: number };
  nodes: SimNode[];
  edges: SimEdge[];
  zones?: SimZone[];
  steps: SimStep[];
  initialStates?: Record<string, Record<string, NodeStateValue>>;
  selectControls?: SimSelectControl[];
  controlEffects?: Record<string, Record<string, ControlEffect>>;
};

export type Reference = {
  label: string;
  href: string;
  source: string;
};

export type Concept = {
  slug: string;
  title: string;
  what: string;
  why: string;
  mentalModel: string;
  simulationId?: string;
  beginnerRefs?: Reference[];
  technicalRefs?: Reference[];
};

export type CurriculumSection = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  blurb: string;
  concepts: Concept[];
};

export type ActivePacket = {
  id: string;
  from: string;
  to: string;
  label: string;
  kind: PacketKind;
  progress: number;
  startedAt: number;
  duration: number;
};

export type SimulationSnapshot = {
  stepIndex: number;
  playing: boolean;
  speed: number;
  autoExplain: boolean;
  progress: number;
  caption: string;
  packets: ActivePacket[];
  nodeStates: Record<string, Record<string, NodeStateValue>>;
  highlights: string[];
  openConnections: string[];
  latencies: Record<string, number>;
  selectedNodeId: string | null;
};
