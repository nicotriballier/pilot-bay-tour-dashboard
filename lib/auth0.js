// lib/auth0.js

import { Auth0Client } from "@auth0/nextjs-auth0/server";

// Extract domain from issuer URL
const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL || '';
const domain = issuerBaseUrl.replace('https://', '').replace('http://', '');
const appBaseUrl = process.env.AUTH0_BASE_URL || 'http://localhost:3000';

// Initialize the Auth0 client 
export const auth0 = new Auth0Client({
  domain: domain,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  appBaseUrl: appBaseUrl,
  secret: process.env.AUTH0_SECRET,
  
  // Configure routes to use /api/auth prefix
  routes: {
    callback: '/api/auth/callback',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
  },
  
  authorizationParameters: {
    scope: process.env.AUTH0_SCOPE || 'openid profile email',
    audience: process.env.AUTH0_AUDIENCE || 'https://pilot.nicopowered.com',
  }
});