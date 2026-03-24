import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface PageTemplateProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
}

export function PageTemplate({ children, title, subtitle }: PageTemplateProps) {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-40 pb-24 px-12 flex-1 animate-fade-in">
        {(title || subtitle) && (
          <div className="text-center mb-24 animate-fade-up">
            {subtitle && (
              <p className="font-label text-[10px] uppercase tracking-[0.4rem] text-secondary mb-4">
                {subtitle}
              </p>
            )}
            {title && (
              <h1 className="font-headline text-6xl font-bold tracking-tight text-inverse-surface">
                {title}
              </h1>
            )}
            <div className="h-1 w-16 bg-primary mt-8 mx-auto"></div>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}
