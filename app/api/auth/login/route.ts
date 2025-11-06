import { auth0 } from '@/lib/auth0';

export async function GET() {
  try {
    // Start the Auth0 login flow with default options
    return await auth0.startInteractiveLogin({
      returnTo: '/',
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}

