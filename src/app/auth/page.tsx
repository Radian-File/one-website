import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getSessionPrincipal } from "@/lib/session";

export default async function AuthPage() {
  const principal = await getSessionPrincipal();
  if (principal) {
    if (principal.role === "admin") {
      redirect("/admin");
    }
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-background text-on-surface px-6 md:px-12 py-10 md:py-16 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/auth"
            className="text-2xl font-bold tracking-tighter text-inverse-surface font-headline"
          >
            ATELIER
          </Link>
          <p className="hidden md:block font-label text-[10px] uppercase tracking-[0.28rem] text-secondary">
            Private Access Portal
          </p>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          <div className="bg-surface-container-low p-10 md:p-14 flex flex-col justify-between animate-fade-up hover-lift">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.35rem] text-primary mb-6">
                Digital Atelier
              </p>
              <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-inverse-surface leading-tight mb-8">
                ACCESS THE
                <br />
                MARKETPLACE
              </h2>
              <p className="font-body text-secondary text-base md:text-lg max-w-xl leading-relaxed">
                Sign in to explore curated objects, track your shopping bag, and manage your
                account securely in one place.
              </p>
            </div>

            <div className="mt-14 pt-8 border-t border-outline-variant/25">
              <div className="flex gap-8 text-[10px] uppercase tracking-[0.16rem] text-secondary font-label">
                <span>Secure Session</span>
                <span>Account Protected</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <AuthForm />
          </div>
        </section>
      </div>
    </main>
  );
}
