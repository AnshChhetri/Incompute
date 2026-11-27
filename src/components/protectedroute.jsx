import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute
 * Wraps any route that requires an authenticated session.
 * Reads the session flag from localStorage (set by AdminPage on login).
 * Redirects unauthenticated visitors to /admin (login form) with the
 * original path stored in location state so they can be sent back after login.
 *
 * Usage in App.jsx:
 *   <Route path="/admin" element={
 *     <ProtectedRoute>
 *       <AdminPage />
 *     </ProtectedRoute>
 *   } />
 */
export default function ProtectedRoute({ children, redirectTo = '/admin' }) {
  const location = useLocation();
  let session = null;
  try { session = JSON.parse(localStorage.getItem('incompute_session')); } catch { session = null; }
  const isAuthenticated = session && session.role;

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
}
