import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
      <div className="space-y-6">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Frontend Baseline
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Build fast with Next.js + TypeScript
        </h1>
        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          Fondasi frontend sudah siap. Selanjutnya kita bisa mapping desain Stitch
          menjadi komponen production-ready section per section.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>Start Building</Button>
          <Button variant="outline">View Sections</Button>
        </div>
      </div>

      <div className="rounded-2xl border bg-muted/30 p-6">
        <h2 className="mb-4 text-lg font-semibold">Next Steps</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Implementasi design system (colors, spacing, typography).</li>
          <li>Bangun komponen reusable dari hasil desain Stitch.</li>
          <li>Integrasi data/API setelah UI stabil.</li>
        </ul>
      </div>
    </section>
  );
}
