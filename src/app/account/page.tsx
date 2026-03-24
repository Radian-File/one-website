import { redirect } from "next/navigation";
import { PageTemplate } from "@/components/layout/page-template";
import { getSessionUser } from "@/lib/session";
import { LogoutButton } from "@/components/auth/logout-button";
import { ChangePasswordForm } from "@/components/auth/change-password-form";

export default async function AccountPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/");
  }

  return (
    <PageTemplate title="Account" subtitle="Profile Information">
      <div className="max-w-2xl mx-auto">
        <div className="bg-surface-container-low p-12 space-y-8">
          <div>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
              Name
            </p>
            <p className="font-headline text-2xl font-bold">{user.name ?? "Atelier Member"}</p>
          </div>

          <div>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
              Email
            </p>
            <p className="font-body text-lg">{user.email}</p>
          </div>

          <div className="pt-4 border-t border-outline-variant/30">
            <ChangePasswordForm />
          </div>

          <LogoutButton />
        </div>
      </div>
    </PageTemplate>
  );
}
