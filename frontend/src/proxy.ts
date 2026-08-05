import { NextResponse, type NextRequest } from "next/server";
import { decodeJwtPayload, isExpired } from "@/lib/jwt";

const COOKIE_NAME = "quiz_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? decodeJwtPayload(token) : null;
  const session = payload && !isExpired(payload) ? payload : null;

  const isAdminRoute = pathname.startsWith("/admin");
  const isParticipantRoute = pathname.startsWith("/participant");

  if ((isAdminRoute || isParticipantRoute) && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && session?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isParticipantRoute && session?.role !== "PARTICIPANT") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if ((pathname === "/login" || pathname === "/register") && session) {
    const home = session.role === "ADMIN" ? "/admin" : "/participant";
    return NextResponse.redirect(new URL(home, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/participant/:path*", "/login", "/register"],
};
