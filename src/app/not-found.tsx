import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight">This concept is not on the map.</h1>
      <Link href="/" className="mt-6 rounded-full bg-foreground px-4 py-2 text-sm text-background">
        Back to Platform Visualizer
      </Link>
    </div>
  );
}
