import { redirect } from "next/navigation";
import { ProductsCrud } from "@/components/admin/products-crud";
import { SellerAccountsManager } from "@/components/admin/seller-accounts-manager";
import { LogoutButton } from "@/components/auth/logout-button";
import { getSessionPrincipal } from "@/lib/session";

export default async function AdminPage() {
  const principal = await getSessionPrincipal();

  if (!principal) {
    redirect("/auth");
  }

  if (principal.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-background text-on-surface px-6 md:px-12 py-10 md:py-16 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="bg-surface-container-low p-8 md:p-10 animate-fade-up">
          <p className="font-label text-[10px] uppercase tracking-[0.3rem] text-secondary mb-3">
            Admin Page
          </p>
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-inverse-surface mb-4">
            Marketplace Control Center
          </h1>
          <p className="text-secondary leading-relaxed">
            Register seller accounts and manage all products shown on the Objects page.
          </p>
          <div className="mt-6 max-w-[220px]">
            <LogoutButton label="Logout Admin" />
          </div>
        </header>

        <SellerAccountsManager />
        <ProductsCrud />
      </div>
    </main>
  );
}
