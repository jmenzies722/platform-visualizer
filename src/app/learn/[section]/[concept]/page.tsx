import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConceptWorkspace } from "@/components/concept/concept-workspace";
import { AppShell } from "@/components/layout/app-shell";
import { curriculum, findConcept, neighbors } from "@/lib/curriculum";
import { getSimulation } from "@/lib/simulations";
import { validateSimulations } from "@/lib/simulations/validate";

type PageProps = {
  params: Promise<{ section: string; concept: string }>;
};

export function generateStaticParams() {
  const problems = validateSimulations();
  if (problems.length) {
    throw new Error(`Invalid simulations:\n${problems.join("\n")}`);
  }

  return curriculum.flatMap((section) =>
    section.concepts.map((concept) => ({
      section: section.id,
      concept: concept.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section, concept } = await params;
  const match = findConcept(section, concept);
  if (!match) return { title: "Concept" };
  return { title: match.concept.title };
}

export default async function ConceptPage({ params }: PageProps) {
  const { section, concept } = await params;
  const match = findConcept(section, concept);
  if (!match) notFound();

  const nearby = neighbors(section, concept);
  const simulation = getSimulation(match.concept.simulationId);

  return (
    <AppShell sectionId={match.section.id} conceptSlug={match.concept.slug}>
      <ConceptWorkspace
        section={match.section}
        concept={match.concept}
        simulation={simulation}
        prevHref={
          nearby.prev
            ? `/learn/${nearby.prev.section.id}/${nearby.prev.concept.slug}`
            : undefined
        }
        nextHref={
          nearby.next
            ? `/learn/${nearby.next.section.id}/${nearby.next.concept.slug}`
            : undefined
        }
      />
    </AppShell>
  );
}
