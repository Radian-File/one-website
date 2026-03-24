import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Stitch Project
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="#features" className="transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="#contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>

        <Button size="sm">Get Started</Button>
      </div>
    </header>
  );
}
