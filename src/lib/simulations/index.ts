import type { SimulationDefinition } from "@/lib/types";
import { agentSimulation } from "@/lib/simulations/agent";
import { aiPlatformSimulation } from "@/lib/simulations/ai-platform";
import { cicdSimulation } from "@/lib/simulations/cicd";
import { cloudSimulation } from "@/lib/simulations/cloud";
import { consistencySimulation } from "@/lib/simulations/consistency";
import { cpuGpuSimulation } from "@/lib/simulations/cpu-gpu";
import { dnsSimulation } from "@/lib/simulations/dns";
import { dockerSimulation } from "@/lib/simulations/docker";
import { gpuInferenceSimulation } from "@/lib/simulations/gpu-inference";
import { httpsSimulation } from "@/lib/simulations/https";
import { inferenceSimulation } from "@/lib/simulations/inference";
import { kubernetesSimulation } from "@/lib/simulations/kubernetes";
import { otelSimulation } from "@/lib/simulations/otel";
import { pipesSimulation } from "@/lib/simulations/pipes";
import { platformSimulation } from "@/lib/simulations/platform";
import { processSimulation } from "@/lib/simulations/process";
import { terraformSimulation } from "@/lib/simulations/terraform";

export const simulations: Record<string, SimulationDefinition> = {
  dns: dnsSimulation,
  https: httpsSimulation,
  docker: dockerSimulation,
  kubernetes: kubernetesSimulation,
  "gpu-inference": gpuInferenceSimulation,
  process: processSimulation,
  pipes: pipesSimulation,
  terraform: terraformSimulation,
  cloud: cloudSimulation,
  otel: otelSimulation,
  agent: agentSimulation,
  cicd: cicdSimulation,
  platform: platformSimulation,
  consistency: consistencySimulation,
  inference: inferenceSimulation,
  "cpu-gpu": cpuGpuSimulation,
  "ai-platform": aiPlatformSimulation,
};

export function getSimulation(id?: string) {
  if (!id) return null;
  return simulations[id] ?? null;
}
