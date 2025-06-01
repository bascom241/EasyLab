// middleware.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
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

  // Prepare a request to your backend check-auth route
  const backendUrl = "https://easylab.onrender.com/api/check-auth";

  try {
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
      credentials: "include",
    });

    const isAuthenticated = response.status === 200;

    console.log("Is Authenticated:", isAuthenticated);

    if (!isAuthenticated && pathname !== "/login" && pathname !== "/register" && !pathname.startsWith("/payment-success")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Auth check failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"], // Match all except static/API
};
