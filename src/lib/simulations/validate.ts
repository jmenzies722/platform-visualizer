import { curriculum } from "@/lib/curriculum";
import { simulations } from "@/lib/simulations";

export function validateSimulations() {
  const problems: string[] = [];

  for (const [id, sim] of Object.entries(simulations)) {
    const nodeIds = new Set(sim.nodes.map((node) => node.id));
    if (!sim.steps.length) problems.push(`${id}: no steps`);
    for (const edge of sim.edges) {
      if (!nodeIds.has(edge.from)) problems.push(`${id}: edge ${edge.id} missing from ${edge.from}`);
      if (!nodeIds.has(edge.to)) problems.push(`${id}: edge ${edge.id} missing to ${edge.to}`);
    }
    for (const step of sim.steps) {
      for (const event of step.events) {
        if (event.type === "packet") {
          if (!nodeIds.has(event.from)) problems.push(`${id}/${step.id}: packet from ${event.from}`);
          if (!nodeIds.has(event.to)) problems.push(`${id}/${step.id}: packet to ${event.to}`);
        }
        if (event.type === "state" && !nodeIds.has(event.nodeId)) {
          problems.push(`${id}/${step.id}: state ${event.nodeId}`);
        }
        if (event.type === "highlight") {
          for (const nodeId of event.nodeIds) {
            if (!nodeIds.has(nodeId)) problems.push(`${id}/${step.id}: highlight ${nodeId}`);
          }
        }
        if (event.type === "latency" && !nodeIds.has(event.nodeId)) {
          problems.push(`${id}/${step.id}: latency ${event.nodeId}`);
        }
      }
    }
  }

  const usedIds = new Set<string>();
  for (const section of curriculum) {
    const live = section.concepts.filter((concept) => concept.simulationId);
    if (!live.length) problems.push(`section ${section.id} has no live simulation`);
    for (const concept of section.concepts) {
      if (concept.simulationId && !simulations[concept.simulationId]) {
        problems.push(`concept ${concept.slug} points at missing ${concept.simulationId}`);
      }
      if (concept.simulationId) usedIds.add(concept.simulationId);
    }
  }

  for (const id of Object.keys(simulations)) {
    if (!usedIds.has(id)) problems.push(`simulation ${id} is registered but unused`);
  }

  return problems;
}
