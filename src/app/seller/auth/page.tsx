import { redirect } from "next/navigation";

export default function SellerAuthRedirectPage() {
  redirect("/auth");
}
