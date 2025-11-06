import { NextRequest, NextResponse } from 'next/server';

// This route handler exists to satisfy Next.js routing requirements
// The actual OAuth callback processing is done by middleware
export async function GET(request: NextRequest) {
  // If we reach here, it means middleware didn't handle it properly
  // Just redirect to home
  console.log('Callback route handler reached - redirecting to home');
  return NextResponse.redirect(new URL('/', request.url));
}

