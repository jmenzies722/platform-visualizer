"use client";

import { useEffect, useRef } from "react";
import { ComingSoon } from "@/components/concept/coming-soon";
import { InspectorPanel } from "@/components/concept/inspector-panel";
import { ReferencePanel } from "@/components/concept/reference-panel";
import { ArchitectureCanvas } from "@/components/simulation/architecture-canvas";
import { SimulationControls } from "@/components/simulation/simulation-controls";
import { Timeline } from "@/components/simulation/timeline";
import { useSimulation } from "@/lib/simulation/use-simulation";
import type { Concept, CurriculumSection, SimulationDefinition } from "@/lib/types";
import { useTeachMode } from "@/components/layout/teach-mode";
import { Maximize2, Minimize2 } from "lucide-react";
import Link from "next/link";

export function ConceptWorkspace({
  section,
  concept,
  simulation,
  prevHref,
  nextHref,
}: {
  section: CurriculumSection;
  concept: Concept;
  simulation: SimulationDefinition | null;
  prevHref?: string;
  nextHref?: string;
}) {
  const { teach, setTeach } = useTeachMode();

  return (
    <div className={teach ? "space-y-4" : "space-y-6"}>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {section.number} {section.title}
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-[-0.03em] md:text-4xl">
            {concept.title}
          </h1>
          {!teach ? (
            <dl className="mt-4 grid gap-3 text-sm leading-relaxed md:grid-cols-3">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  What is it?
                </dt>
                <dd className="mt-1">{concept.what}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Why does it exist?
                </dt>
                <dd className="mt-1">{concept.why}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Mental model
                </dt>
                <dd className="mt-1">{concept.mentalModel}</dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Teach mode. Space plays. Arrows step. F exits. The picture is the lesson.
            </p>
          )}
        </div>
        {simulation ? (
          <button
            type="button"
            onClick={() => setTeach((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-xs"
          >
            {teach ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            {teach ? "Exit teach" : "Teach mode"}
          </button>
        ) : null}
      </header>

      {simulation ? (
        <LiveSimulation key={simulation.id} simulation={simulation} teach={teach} />
      ) : (
        <ComingSoon title={concept.title} />
      )}

      {!teach ? (
        <>
          <ReferencePanel
            beginner={concept.beginnerRefs}
            technical={concept.technicalRefs}
          />
          <nav className="flex items-center justify-between text-sm text-muted-foreground">
            {prevHref ? <Link href={prevHref}>← Previous concept</Link> : <span />}
            {nextHref ? <Link href={nextHref}>Next concept →</Link> : <span />}
          </nav>
        </>
      ) : null}
    </div>
  );
}

function LiveSimulation({
  simulation,
  teach,
}: {
  simulation: SimulationDefinition;
  teach: boolean;
}) {
  const engine = useSimulation(simulation);
  const engineRef = useRef(engine);
  const { setTeach } = useTeachMode();

  useEffect(() => {
    engineRef.current = engine;
  }, [engine]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const current = engineRef.current;
      if (event.code === "Space") {
        event.preventDefault();
        if (current.playing) current.pause();
        else current.play();
      }
      if (event.key === "ArrowRight") current.next();
      if (event.key === "ArrowLeft") current.previous();
      if (event.key === "Home" || event.key.toLowerCase() === "r") current.restart();
      if (event.key === "1") current.setSpeed(0.5);
      if (event.key === "2") current.setSpeed(1);
      if (event.key === "3") current.setSpeed(2);
      if (event.key.toLowerCase() === "f") setTeach((value) => !value);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setTeach]);

  return (
    <div className={teach ? "block" : "grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]"}>
      <div className="space-y-4">
        <ArchitectureCanvas
          nodes={simulation.nodes}
          edges={simulation.edges}
          zones={simulation.zones}
          packets={engine.packets}
          nodeStates={engine.nodeStates}
          highlights={engine.highlights}
          openConnections={engine.openConnections}
          latencies={engine.latencies}
          selectedNodeId={engine.selectedNodeId}
          caption={engine.caption}
          autoExplain={engine.autoExplain}
          onSelectNode={engine.setSelectedNodeId}
        />
        <div className="sticky bottom-0 z-20 -mx-1 bg-background/85 px-1 py-3 backdrop-blur">
          <SimulationControls
            playing={engine.playing}
            speed={engine.speed}
            autoExplain={engine.autoExplain}
            progress={engine.progress}
            stepIndex={engine.stepIndex}
            steps={engine.steps}
            selectControls={simulation.selectControls}
            controlValues={engine.controlValues}
            onPlay={engine.play}
            onPause={engine.pause}
            onRestart={engine.restart}
            onNext={engine.next}
            onPrevious={engine.previous}
            onSpeed={engine.setSpeed}
            onAutoExplain={engine.setAutoExplain}
            onControl={engine.setControl}
          />
        </div>
        {!teach ? (
          <Timeline
            steps={engine.steps}
            current={engine.stepIndex}
            onSelect={engine.goToStep}
          />
        ) : null}
      </div>
      {!teach ? <InspectorPanel node={engine.selectedNode} /> : null}
    </div>
  );
}
