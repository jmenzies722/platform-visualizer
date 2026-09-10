"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { searchConcepts } from "@/lib/curriculum";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "/" && !open) {
        const target = event.target as HTMLElement | null;
        if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const results = useMemo(() => searchConcepts(query).slice(0, 12), [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-2xl bg-muted px-3 py-2 text-left text-sm text-muted-foreground"
      >
        <Search className="h-4 w-4" />
        Search concepts
        <kbd className="ml-auto rounded-md bg-background px-1.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-24">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-card hairline">
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="DNS, replica, KV cache…"
              className="w-full bg-transparent px-5 py-4 text-base outline-none"
            />
            <ul className="max-h-80 overflow-y-auto border-t border-border">
              {results.map(({ section, concept }) => (
                <li key={`${section.id}-${concept.slug}`}>
                  <Link
                    href={`/learn/${section.id}/${concept.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-muted"
                  >
                    <span>
                      <span className="block text-sm">{concept.title}</span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {section.number} {section.shortTitle}
                      </span>
                    </span>
                    {concept.simulationId ? (
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent">
                        Live
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
              {query && !results.length ? (
                <li className="px-5 py-6 text-sm text-muted-foreground">No matches.</li>
              ) : null}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
