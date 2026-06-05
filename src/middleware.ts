import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Decoy: /admin → 404
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  // Protect all /altuit-dashboard routes
  if (pathname.startsWith("/altuit-dashboard")) {
    // Allow login page without session
    if (pathname === "/altuit-dashboard/login") {
      return NextResponse.next();
    }

    const session = request.cookies.get("admin-session")?.value;

    if (!session || session !== "true") {
      // Redirect to login page
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/altuit-dashboard/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/altuit-dashboard/:path*"],
};
