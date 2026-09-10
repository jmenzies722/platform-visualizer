"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CurriculumNav } from "@/components/layout/curriculum-nav";
import { SearchDialog } from "@/components/layout/search-dialog";
import { TeachModeProvider, useTeachMode } from "@/components/layout/teach-mode";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function AppShell({
  children,
  sectionId,
  conceptSlug,
}: {
  children: React.ReactNode;
  sectionId?: string;
  conceptSlug?: string;
}) {
  return (
    <TeachModeProvider>
      <AppShellInner sectionId={sectionId} conceptSlug={conceptSlug}>
        {children}
      </AppShellInner>
    </TeachModeProvider>
  );
}

function AppShellInner({
  children,
  sectionId,
  conceptSlug,
}: {
  children: React.ReactNode;
  sectionId?: string;
  conceptSlug?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { teach } = useTeachMode();

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        <aside
          className={`hidden w-[300px] shrink-0 flex-col border-r border-border px-4 py-5 lg:flex ${teach ? "lg:hidden" : ""}`}
        >
          <Brand />
          <div className="mt-5">
            <SearchDialog />
          </div>
          <div className="mt-5 flex-1 overflow-y-auto pr-1 scrollbar-thin">
            <CurriculumNav sectionId={sectionId} conceptSlug={conceptSlug} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className={`flex items-center justify-between gap-3 border-b border-border px-4 py-3 lg:px-8 ${teach ? "hidden" : ""}`}>
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                aria-label="Open curriculum"
                onClick={() => setMobileOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted"
              >
                <Menu className="h-4 w-4" />
              </button>
              <Brand compact />
            </div>
            <p className="hidden text-sm text-muted-foreground lg:block">
              The visualization is the lesson.
            </p>
            <ThemeToggle />
          </header>
          <main className="flex-1 px-4 py-4 lg:px-8 lg:py-6">{children}</main>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-background/95 p-4 lg:hidden">
          <div className="mb-4 flex items-center justify-between">
            <Brand />
            <button
              type="button"
              aria-label="Close curriculum"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <SearchDialog />
          <div className="mt-4 h-[calc(100vh-9rem)] overflow-y-auto scrollbar-thin">
            <CurriculumNav sectionId={sectionId} conceptSlug={conceptSlug} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Brand({ compact }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      <span className="text-sm font-medium tracking-tight">
        {compact ? "PV" : "Platform Visualizer"}
      </span>
    </Link>
  );
}
