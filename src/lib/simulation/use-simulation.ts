"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  applyInstantEvents,
  cloneStates,
  eventsAt,
  mergeState,
  nextIndex,
  prevIndex,
  spawnPacket,
  type Speed,
} from "@/lib/simulation/engine";
import type {
  ActivePacket,
  NodeStateValue,
  SimStep,
  SimulationDefinition,
} from "@/lib/types";

function emptyStates(definition: SimulationDefinition) {
  return cloneStates(definition.initialStates);
}

function boot(definition: SimulationDefinition) {
  const first = definition.steps[0];
  const states = emptyStates(definition);
  applyControlEffects(
    definition,
    Object.fromEntries(
      (definition.selectControls ?? []).map((control) => [control.id, control.defaultValue]),
    ),
    states,
  );
  if (!first) {
    return {
      states,
      highlights: [] as string[],
      connections: [] as string[],
      latencies: {} as Record<string, number>,
      caption: "",
    };
  }
  const applied = applyInstantEvents(definition, first, states);
  return {
    states,
    highlights: applied.highlights,
    connections: [...applied.connections],
    latencies: applied.latencies,
    caption: applied.caption,
  };
}

function applyControlEffects(
  definition: SimulationDefinition,
  controls: Record<string, string>,
  states: Record<string, Record<string, NodeStateValue>>,
) {
  if (!definition.controlEffects) return;
  for (const [id, value] of Object.entries(controls)) {
    const effect = definition.controlEffects[id]?.[value];
    if (!effect) continue;
    for (const [nodeId, patch] of Object.entries(effect.states)) {
      mergeState(states, nodeId, patch);
    }
  }
}

export function useSimulation(definition: SimulationDefinition) {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);
  const [autoExplain, setAutoExplain] = useState(true);
  const [booted] = useState(() => boot(definition));
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState(booted.caption);
  const [packets, setPackets] = useState<ActivePacket[]>([]);
  const [nodeStates, setNodeStates] = useState(booted.states);
  const [highlights, setHighlights] = useState(booted.highlights);
  const [openConnections, setOpenConnections] = useState(booted.connections);
  const [latencies, setLatencies] = useState(booted.latencies);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [controlValues, setControlValues] = useState<Record<string, string>>(() => {
    const values: Record<string, string> = {};
    for (const control of definition.selectControls ?? []) {
      values[control.id] = control.defaultValue;
    }
    return values;
  });

  const elapsedRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);
  const appliedDelayRef = useRef(-1);
  const definitionRef = useRef(definition);
  const controlValuesRef = useRef(controlValues);

  useEffect(() => {
    definitionRef.current = definition;
    controlValuesRef.current = controlValues;
  }, [definition, controlValues]);

  const step = definition.steps[stepIndex];

  const enterStep = useCallback((nextStep: SimStep, mode: "play" | "scrub" = "play") => {
    const states = emptyStates(definitionRef.current);
    applyControlEffects(definitionRef.current, controlValuesRef.current, states);

    if (mode === "scrub") {
      const highlights: string[] = [];
      const connections = new Set<string>();
      const latencies: Record<string, number> = {};
      let caption = nextStep.explanation;
      for (const event of nextStep.events) {
        if (event.type === "state") mergeState(states, event.nodeId, event.patch);
        if (event.type === "highlight") highlights.splice(0, highlights.length, ...event.nodeIds);
        if (event.type === "explain") caption = event.text;
        if (event.type === "connection") {
          if (event.open) connections.add(event.edgeId);
          else connections.delete(event.edgeId);
        }
        if (event.type === "latency" && event.ms != null) latencies[event.nodeId] = event.ms;
      }
      applyControlEffects(definitionRef.current, controlValuesRef.current, states);
      elapsedRef.current = nextStep.duration;
      appliedDelayRef.current = nextStep.duration;
      lastTickRef.current = null;
      setNodeStates(states);
      setHighlights(highlights);
      setOpenConnections([...connections]);
      setLatencies(latencies);
      setCaption(caption);
      setProgress(1);
      setPackets([]);
      return;
    }

    const applied = applyInstantEvents(definitionRef.current, nextStep, states);
    elapsedRef.current = 0;
    appliedDelayRef.current = 0;
    lastTickRef.current = null;
    setNodeStates(states);
    setHighlights(applied.highlights);
    setOpenConnections([...applied.connections]);
    setLatencies(applied.latencies);
    setCaption(applied.caption);
    setProgress(0);
    setPackets([]);
  }, []);

  useEffect(() => {
    if (!playing) {
      lastTickRef.current = null;
      return;
    }

    let frame = 0;
    const tick = (now: number) => {
      const current = definitionRef.current.steps[stepIndex];
      if (!current) return;

      if (lastTickRef.current == null) lastTickRef.current = now;
      const delta = (now - lastTickRef.current) * speed;
      lastTickRef.current = now;
      elapsedRef.current += delta;

      const due = eventsAt(current, elapsedRef.current, appliedDelayRef.current);
      if (due.length) {
        appliedDelayRef.current = elapsedRef.current;
        setNodeStates((prev) => {
          const next = cloneStates(prev);
          for (const event of due) {
            if (event.type === "state") mergeState(next, event.nodeId, event.patch);
          }
          return next;
        });
        setHighlights((prev) => {
          let next = prev;
          for (const event of due) {
            if (event.type === "highlight") next = event.nodeIds;
          }
          return next;
        });
        setOpenConnections((prev) => {
          const next = new Set(prev);
          for (const event of due) {
            if (event.type === "connection") {
              if (event.open) next.add(event.edgeId);
              else next.delete(event.edgeId);
            }
          }
          return [...next];
        });
        setLatencies((prev) => {
          const next = { ...prev };
          for (const event of due) {
            if (event.type === "latency") {
              if (event.ms == null) delete next[event.nodeId];
              else next[event.nodeId] = event.ms;
            }
          }
          return next;
        });
        for (const event of due) {
          if (event.type === "explain") setCaption(event.text);
        }
        const spawned = due
          .filter((event) => event.type === "packet")
          .map((event, index) => spawnPacket(event, now, index));
        setPackets((prev) =>
          [...prev, ...spawned]
            .map((packet) => ({
              ...packet,
              progress: Math.min(
                1,
                (now - packet.startedAt) / (packet.duration / speed),
              ),
            }))
            .filter((packet) => packet.progress < 1.02),
        );
      } else {
        setPackets((prev) =>
          prev
            .map((packet) => ({
              ...packet,
              progress: Math.min(
                1,
                (now - packet.startedAt) / (packet.duration / speed),
              ),
            }))
            .filter((packet) => packet.progress < 1.02),
        );
      }

      const ratio = Math.min(1, elapsedRef.current / current.duration);
      setProgress(ratio);

      if (elapsedRef.current >= current.duration) {
        if (stepIndex < definitionRef.current.steps.length - 1) {
          const upcoming = definitionRef.current.steps[stepIndex + 1];
          setStepIndex(stepIndex + 1);
          enterStep(upcoming);
        } else {
          setPlaying(false);
          setProgress(1);
        }
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, speed, stepIndex, enterStep]);

  const play = useCallback(() => {
    if (stepIndex >= definition.steps.length - 1 && progress >= 1) {
      const first = definition.steps[0];
      setStepIndex(0);
      if (first) enterStep(first);
    } else if (progress >= 1) {
      const upcoming = definition.steps[stepIndex + 1];
      if (upcoming) {
        setStepIndex(stepIndex + 1);
        enterStep(upcoming);
      }
    }
    setPlaying(true);
  }, [definition.steps, enterStep, progress, stepIndex]);

  const pause = useCallback(() => setPlaying(false), []);

  const restart = useCallback(() => {
    const first = definition.steps[0];
    setPlaying(false);
    setStepIndex(0);
    if (first) enterStep(first);
  }, [definition.steps, enterStep]);

  const goToStep = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, definition.steps.length - 1));
      const next = definition.steps[clamped];
      setPlaying(false);
      setStepIndex(clamped);
      if (next) enterStep(next, "scrub");
    },
    [definition.steps, enterStep],
  );

  const next = useCallback(() => {
    goToStep(nextIndex(stepIndex, definition.steps.length));
  }, [definition.steps.length, goToStep, stepIndex]);

  const previous = useCallback(() => {
    goToStep(prevIndex(stepIndex));
  }, [goToStep, stepIndex]);

  const setControl = useCallback(
    (id: string, value: string) => {
      setControlValues((prev) => {
        const next = { ...prev, [id]: value };
        setNodeStates((states) => {
          const merged = cloneStates(states);
          applyControlEffects(definitionRef.current, next, merged);
          return merged;
        });
        const effect = definitionRef.current.controlEffects?.[id]?.[value];
        if (effect?.caption) setCaption(effect.caption);
        return next;
      });
    },
    [],
  );

  const selectedNode = useMemo(
    () => definition.nodes.find((node) => node.id === selectedNodeId) ?? null,
    [definition.nodes, selectedNodeId],
  );

  return {
    step,
    stepIndex,
    steps: definition.steps,
    playing,
    speed,
    setSpeed,
    autoExplain,
    setAutoExplain,
    progress,
    caption,
    packets,
    nodeStates,
    highlights,
    openConnections,
    latencies,
    selectedNodeId,
    setSelectedNodeId,
    selectedNode,
    controlValues,
    setControl,
    play,
    pause,
    restart,
    next,
    previous,
    goToStep,
  };
}

export function usePacketPosition(
  packet: ActivePacket,
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  const t = packet.progress;
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2 - 8;
  const x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x;
  const y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y;
  return { x, y };
}
