"use client";

import Link from "next/link";
import { findConceptBySlug } from "@/lib/curriculum";
import type { InspectorInfo, SimNode } from "@/lib/types";

export function InspectorPanel({
  node,
}: {
  node: SimNode | null;
  sectionId?: string;
}) {
  if (!node) {
    return (
      <aside className="rounded-[28px] bg-card p-5 hairline xl:sticky xl:top-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Inspector
        </p>
        <h2 className="mt-2 text-lg font-medium tracking-tight">Click a component</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Every box is live. Open one to see what it is, what it receives, and why it exists.
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-[28px] bg-card p-5 hairline xl:sticky xl:top-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Inspector
      </p>
      <h2 className="mt-2 text-lg font-medium tracking-tight">{node.label}</h2>
      {node.subtitle ? (
        <p className="mt-1 font-mono text-xs text-muted-foreground">{node.subtitle}</p>
      ) : null}
      <InspectorBody info={node.inspector} />
    </aside>
  );
}

export function InspectorBody({
  info,
}: {
  info: InspectorInfo;
}) {
  return (
    <div className="mt-5 space-y-4 text-sm leading-relaxed">
      <Field title="What is it?" body={info.what} />
      <Field title="What does it receive?" body={info.receives} />
      <Field title="What does it return?" body={info.returns} />
      <Field title="Why is it important?" body={info.why} />
      {info.related.length ? (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Related concepts
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {info.related.map((item) => {
              const match = item.slug ? findConceptBySlug(item.slug) : null;
              const href = match
                ? `/learn/${match.section.id}/${match.concept.slug}`
                : null;
              return href ? (
                <Link
                  key={item.label}
                  href={href}
                  className="rounded-full bg-muted px-2.5 py-1 text-xs"
                >
                  {item.label}
                </Link>
              ) : (
                <span key={item.label} className="rounded-full bg-muted px-2.5 py-1 text-xs">
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Field({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <p className="mt-1">{body}</p>
    </div>
  );
}
