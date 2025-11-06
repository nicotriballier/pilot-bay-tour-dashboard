import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Get environment variables
    const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const baseUrl = process.env.AUTH0_BASE_URL || new URL(request.url).origin;

    if (!issuerBaseUrl || !clientId) {
      console.error('Missing Auth0 environment variables');
    }

    // Build Auth0 logout URL
    const auth0Domain = issuerBaseUrl?.replace('https://', '').replace('http://', '') || '';
    const logoutUrl = new URL(`https://${auth0Domain}/v2/logout`);
    logoutUrl.searchParams.set('client_id', clientId || '');
    logoutUrl.searchParams.set('returnTo', baseUrl);

    // Get the cookies store
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    // Create response that redirects to Auth0 logout
    const response = NextResponse.redirect(logoutUrl);
    
    // Aggressively delete ALL session-related cookies
    allCookies.forEach(cookie => {
      if (cookie.name.startsWith('__session') || 
          cookie.name.startsWith('appSession') || 
          cookie.name === 'auth_verification' ||
          cookie.name.includes('auth')) {
        
        // Delete with various path/domain combinations to ensure it works
        response.cookies.set(cookie.name, '', {
          path: '/',
          expires: new Date(0),
          maxAge: 0,
        });
        
        response.cookies.delete(cookie.name);
      }
    });
    
    console.log('Logout: Cleared cookies and redirecting to Auth0 logout');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    
    // On error, just redirect home and try to clear cookies
    const response = NextResponse.redirect(new URL('/', request.url));
    
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();
      allCookies.forEach(cookie => {
        if (cookie.name.startsWith('__session') || cookie.name.startsWith('appSession')) {
          response.cookies.delete(cookie.name);
        }
      });
    } catch (e) {
      console.error('Could not clear cookies:', e);
    }
    
    return response;
  }
}

