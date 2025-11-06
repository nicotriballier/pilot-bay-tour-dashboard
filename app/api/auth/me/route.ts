import { auth0 } from '@/lib/auth0';

export async function GET() {
  try {
    const session = await auth0.getSession();
    
    if (!session) {
      // Return empty response when not logged in (not an error)
      return Response.json({});
    }

    return Response.json(session.user);
  } catch (error) {
    console.error('Error fetching user session:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

