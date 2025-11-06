import { auth0 } from '@/lib/auth0';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const session = await auth0.getSession();
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    return Response.json({
      hasSession: !!session,
      user: session?.user || null,
      cookies: allCookies.map(c => ({ name: c.name, value: c.value.substring(0, 50) })),
    });
  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

