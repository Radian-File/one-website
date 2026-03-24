import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-12 py-24 w-full">
        <div>
          <span className="text-xl font-bold text-inverse-surface font-headline mb-8 block">
            ATELIER
          </span>
          <p className="font-body text-sm text-secondary max-w-sm mb-12">
            A digital destination for curated objects, fashion, and editorial thought. Built on
            the principles of minimalism and architectural longevity.
          </p>
          <div className="flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">public</span>
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">camera</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h5 className="font-label text-[10px] uppercase tracking-[0.2rem] text-inverse-surface mb-6">
              Information
            </h5>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/sustainability"
                  className="font-label text-[10px] uppercase tracking-[0.1rem] text-secondary opacity-70 hover:opacity-100 transition-opacity"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="font-label text-[10px] uppercase tracking-[0.1rem] text-secondary opacity-70 hover:opacity-100 transition-opacity"
                >
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="font-label text-[10px] uppercase tracking-[0.1rem] text-secondary opacity-70 hover:opacity-100 transition-opacity"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-label text-[10px] uppercase tracking-[0.2rem] text-inverse-surface mb-6">
              Explore
            </h5>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/editorial"
                  className="font-label text-[10px] uppercase tracking-[0.1rem] text-secondary opacity-70 hover:opacity-100 transition-opacity"
                >
                  Journal
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-label text-[10px] uppercase tracking-[0.1rem] text-secondary opacity-70 hover:opacity-100 transition-opacity"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-label text-[10px] uppercase tracking-[0.1rem] text-secondary opacity-70 hover:opacity-100 transition-opacity"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-12 py-8 border-t border-outline-variant/10 flex justify-between items-center">
        <span className="font-label text-[10px] uppercase tracking-[0.1rem] text-secondary">
          © 2024 THE DIGITAL ATELIER. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-4">
          <span className="font-label text-[10px] uppercase tracking-[0.1rem] text-secondary">
            Global Shipping
          </span>
          <span className="font-label text-[10px] uppercase tracking-[0.1rem] text-secondary">
            Secured Payment
          </span>
        </div>
      </div>
    </footer>
  );
}
