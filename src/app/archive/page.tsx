import { PageTemplate } from "@/components/layout/page-template";

export default function ArchivePage() {
  return (
    <PageTemplate title="Archive" subtitle="Past Collections">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-body text-secondary text-lg">
          Explore our historical collections and timeless pieces from seasons past.
        </p>
        <div className="mt-16 p-16 bg-surface-container-low">
          <span className="material-symbols-outlined text-6xl text-outline mb-6 block">
            archive
          </span>
          <p className="font-label text-sm text-secondary">Archive launching soon</p>
        </div>
      </div>
    </PageTemplate>
  );
}
