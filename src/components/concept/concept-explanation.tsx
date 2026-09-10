import type { Concept } from "@/lib/types";

export function ConceptExplanation({ concept }: { concept: Concept }) {
  return (
    <dl className="grid gap-4 text-sm leading-relaxed md:grid-cols-3">
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
  );
}
