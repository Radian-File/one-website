import { redirect } from "next/navigation";
import { PageTemplate } from "@/components/layout/page-template";
import { AuthForm } from "@/components/auth/auth-form";
import { isAuthenticated } from "@/lib/session";

export default async function AuthPage() {
  const authenticated = await isAuthenticated();
  if (authenticated) {
    redirect("/");
  }

  return (
    <PageTemplate title="Account" subtitle="Sign In or Register">
      <AuthForm />
    </PageTemplate>
  );
}
