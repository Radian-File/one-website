import { cookies } from "next/headers";
import { APP_SESSION_COOKIE } from "@/lib/session";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(APP_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return Response.json({ message: "Signed out" });
}
