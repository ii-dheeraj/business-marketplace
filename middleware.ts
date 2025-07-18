import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    // In a real app, you would check for a valid admin session/token
    // For demo purposes, we'll check localStorage on the client side
    // In production, use proper server-side session management

    const adminAuth = request.cookies.get("adminAuth")

    if (!adminAuth) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
