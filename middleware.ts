import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { auth } from "@/lib/firebase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Forward to protected route if we have a session
  if (auth.currentUser) {
    return res;
  }

  // Auth condition not met, redirect to signin page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/signin";
  const redirectRes = NextResponse.redirect(redirectUrl);
  redirectRes.cookies.set("continue", req.nextUrl.pathname);
  return redirectRes;
}

export const config = {
  matcher: ["/dashboard", "/settings/:path*"],
};
