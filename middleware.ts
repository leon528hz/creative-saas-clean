import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname.startsWith("/dashboard")) {
    const hasAuth =
      req.cookies.get("sb-access-token") || req.cookies.get("sb-refresh-token");
    if (!hasAuth) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
