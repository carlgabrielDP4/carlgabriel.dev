import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
        404 - Off the map
      </div>
      <h1 className="mt-6 font-display text-[clamp(4rem,15vw,15rem)] font-medium leading-[0.9] tracking-tight">
        Lost.
      </h1>
      <p className="mt-4 max-w-md text-[var(--fg-muted)]">
        This page is somewhere between Tokyo and Wellington. Maybe try going home.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-[var(--line)] px-6 py-3 text-sm transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
      >
        Take me home
      </Link>
    </main>
  );
}
