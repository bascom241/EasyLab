import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;
  console.log("Token:", token);
  const isAuthenticated = token !== null;
  console.log("Is Authenticated:", isAuthenticated);

  const { pathname } = req.nextUrl;

  // Skip static files, internal files, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") || 
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (!isAuthenticated && pathname !== "/login" && pathname !== "/register" && !pathname.startsWith("/payment-success")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
