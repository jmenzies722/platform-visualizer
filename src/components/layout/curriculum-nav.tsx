"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { curriculum } from "@/lib/curriculum";

export function CurriculumNav({
  sectionId,
  conceptSlug,
}: {
  sectionId?: string;
  conceptSlug?: string;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (sectionId) initial[sectionId] = true;
    return initial;
  });

  const counts = useMemo(
    () =>
      Object.fromEntries(
        curriculum.map((section) => [
          section.id,
          section.concepts.filter((concept) => concept.simulationId).length,
        ]),
      ),
    [],
  );

  return (
    <nav className="space-y-1">
      {curriculum.map((section) => {
        const expanded = open[section.id] ?? false;
        return (
          <div key={section.id}>
            <button
              type="button"
              onClick={() =>
                setOpen((prev) => ({ ...prev, [section.id]: !prev[section.id] }))
              }
              className={cn(
                "flex w-full items-center gap-2 rounded-2xl px-2.5 py-2 text-left",
                sectionId === section.id ? "bg-muted" : "hover:bg-muted/70",
              )}
            >
              <span className="w-6 font-mono text-[11px] text-muted-foreground">
                {section.number}
              </span>
              <span className="flex-1 text-[13px]">{section.shortTitle}</span>
              {counts[section.id] ? (
                <span className="rounded-full bg-accent/15 px-1.5 font-mono text-[9px] text-accent">
                  {counts[section.id]}
                </span>
              ) : null}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-muted-foreground transition",
                  expanded ? "rotate-180" : "",
                )}
              />
            </button>
            {expanded ? (
              <ul className="mb-2 ml-8 mt-1 space-y-0.5">
                {section.concepts.map((concept) => (
                  <li key={concept.slug}>
                    <Link
                      href={`/learn/${section.id}/${concept.slug}`}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-2 py-1.5 text-[13px]",
                        conceptSlug === concept.slug && sectionId === section.id
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span>{concept.title}</span>
                      {concept.simulationId ? (
                        <span className="ml-2 h-1.5 w-1.5 rounded-full bg-good" />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
