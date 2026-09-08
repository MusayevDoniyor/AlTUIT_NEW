import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Decoy: /admin → 404
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  // Protect all /altuit-dashboard routes with a verified Supabase session
  if (pathname.startsWith("/altuit-dashboard")) {
    let response = NextResponse.next({
      request: { headers: request.headers },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Optional admin allowlist (defense in depth).
    // Set ADMIN_EMAILS="admin1@...,admin2@..." to restrict dashboard
    // access to specific accounts. When unset, any authenticated user
    // is allowed (existing behaviour). Combine with the RLS policy in
    // supabase-security-hardening.sql for real protection.
    const adminEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    if (
      adminEmails.length > 0 &&
      !adminEmails.includes((user.email ?? "").toLowerCase())
    ) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/altuit-dashboard/:path*"],
};
