import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  // Handle callback in middleware - this is the ONLY auth route handled by middleware
  if (request.nextUrl.pathname === '/api/auth/callback') {
    console.log('Middleware handling callback for URL:', request.url);
    try {
      const response = await auth0.middleware(request);
      console.log('Middleware callback successful, response status:', response.status);
      console.log('Response cookies:', response.cookies.getAll());
      return response;
    } catch (error) {
      console.error('Middleware callback error:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
      }
      return NextResponse.redirect(new URL('/?error=middleware_callback_failed', request.url));
    }
  }
  
  // Skip middleware for other auth routes - let the route handlers manage them
  if (request.nextUrl.pathname.startsWith('/api/auth/')) {
    console.log('Skipping middleware for auth route:', request.nextUrl.pathname);
    return NextResponse.next();
  }
  
  // Check if user has a session cookie
  const hasSession = request.cookies.has('__session') || request.cookies.has('appSession');
  
  // If no session cookie, don't run auth middleware
  // This is crucial for preventing session recreation after logout
  if (!hasSession) {
    console.log('No session cookie found on', request.nextUrl.pathname, '- skipping auth middleware');
    return NextResponse.next();
  }
  
  console.log('Session cookie found on', request.nextUrl.pathname, '- running auth middleware');
  
  try {
    const response = await auth0.middleware(request);
    console.log('Auth middleware successful for', request.nextUrl.pathname);
    return response;
  } catch (error) {
    console.error('Middleware auth error:', error);
    // Clear invalid session cookie and continue
    const response = NextResponse.next();
    response.cookies.delete('__session');
    response.cookies.delete('appSession');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/api/auth/callback",
  ],
};