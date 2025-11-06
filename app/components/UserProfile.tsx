'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

export default function UserProfile() {
  const { user, error, isLoading } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (isLoading) return <div className="text-sm">Loading...</div>;
  
  // Don't show errors for auth issues - just show login button
  // Only log actual errors to console
  if (error && error.message !== 'Unauthorized') {
    console.error('User profile error:', error);
  }

  if (user) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {user.picture && (
            <img
              src={user.picture}
              alt={user.name || 'User'}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="font-medium">{user.name}</span>
          <svg
            className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="text-sm font-medium text-gray-900">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
            <a
              href="/api/auth/logout"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href="/api/auth/login"
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
    >
      Login
    </a>
  );
}

