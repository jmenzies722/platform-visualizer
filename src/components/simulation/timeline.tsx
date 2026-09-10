"use client";

import { cn } from "@/lib/cn";
import type { SimStep } from "@/lib/types";

export function Timeline({
  steps,
  current,
  onSelect,
}: {
  steps: SimStep[];
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ol className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
      {steps.map((step, index) => (
        <li key={step.id}>
          <button
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              "whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[11px] transition",
              index === current
                ? "bg-foreground text-background"
                : index < current
                  ? "bg-accent/15 text-foreground"
                  : "bg-muted text-muted-foreground",
            )}
          >
            {String(index + 1).padStart(2, "0")} {step.title}
          </button>
        </li>
      ))}
    </ol>
  );
}
