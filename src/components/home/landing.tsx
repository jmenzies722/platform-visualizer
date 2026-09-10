import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { curriculum, flagshipHrefs } from "@/lib/curriculum";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Landing() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="text-sm font-medium tracking-tight">Platform Visualizer</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/learn/networking/dns" className="text-sm text-muted-foreground">
            Start with DNS
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:pt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Beginner → Platform Engineer → AI Platform Engineer
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-medium tracking-[-0.04em] md:text-6xl">
          Watch infrastructure actually work.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          No lectures. No labs. A name becomes an address. A wish becomes three
          pods. A prompt becomes tokens on a GPU. Press play and narrate it like
          a video — the system is the explanation.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/learn/networking/dns"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background"
          >
            Play the first simulation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/learn/kubernetes/deployment"
            className="inline-flex items-center gap-2 rounded-full bg-muted px-5 py-2.5 text-sm"
          >
            Jump to Kubernetes
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Live simulations
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {flagshipHrefs.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[28px] bg-card p-6 hairline transition hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")} · {item.section}
                </span>
                <span className="rounded-full bg-good/15 px-2 py-0.5 font-mono text-[10px] text-good">
                  Live
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-medium tracking-tight">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.line}</p>
              <p className="mt-5 text-sm text-accent">
                Open simulation <ArrowRight className="inline h-3.5 w-3.5" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Full curriculum
        </p>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every concept has a home. Unbuilt pages stay empty on purpose — no
          fake diagrams.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {curriculum.map((section) => (
            <Link
              key={section.id}
              href={`/learn/${section.id}/${section.concepts[0].slug}`}
              className="rounded-3xl bg-card p-4 hairline"
            >
              <p className="font-mono text-[11px] text-muted-foreground">{section.number}</p>
              <h3 className="mt-2 text-sm font-medium">{section.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {section.concepts.length} concepts
                {section.concepts.some((concept) => concept.simulationId)
                  ? " · live sim"
                  : ""}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
