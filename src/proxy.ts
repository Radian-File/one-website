import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("atelier_session")?.value;

  const isAuthenticated = !!session;
  const isAdmin = session?.startsWith("admin-") ?? false;

  if (pathname === "/auth") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(isAdmin ? "/admin" : "/", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
