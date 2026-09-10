import { ArrowUpRight } from "lucide-react";
import type { Reference } from "@/lib/types";

export function ReferencePanel({
  beginner = [],
  technical = [],
}: {
  beginner?: Reference[];
  technical?: Reference[];
}) {
  if (!beginner.length && !technical.length) return null;

  return (
    <section className="rounded-[28px] bg-card p-5 hairline">
      <h2 className="text-sm font-medium">Learn more</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Short list. Primary sources only.
      </p>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <RefGroup title="Beginner reference" items={beginner} />
        <RefGroup title="Technical reference" items={technical} />
      </div>
    </section>
  );
}

function RefGroup({ title, items }: { title: string; items: Reference[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start justify-between gap-3 rounded-2xl bg-muted px-3 py-2.5"
            >
              <span>
                <span className="block text-sm">{item.label}</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {item.source}
                </span>
              </span>
              <ArrowUpRight className="mt-0.5 h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
