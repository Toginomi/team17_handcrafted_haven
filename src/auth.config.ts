import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // In Middleware, sometimes role is nested or needs a fallback
      const role = auth?.user?.role;

      const isAccountArea = nextUrl.pathname.startsWith('/account');
      const isSignUpPage = nextUrl.pathname === '/account/add';
      const isAdminArea = nextUrl.pathname.startsWith('/admin');
      const isSellerArea = nextUrl.pathname.startsWith('/seller');

      if (isSignUpPage) return true; 

      if (isAccountArea || isAdminArea) {
        if (!isLoggedIn) return false;
        
        if (isAdminArea && role !== 'admin') {
          return Response.redirect(new URL('/account/home', nextUrl));
        }
        return true;
      }

      if (isSellerArea) {
        if (!isLoggedIn) return false;

        // DEBUG: If you are getting redirected, it's because 'role' is undefined here
        // We add a check: if role is missing, we might let the PAGE handle the redirect
        // instead of the Middleware, to avoid "stale" cookie issues.
        if (role && role !== 'seller' && role !== 'admin') {
          return Response.redirect(new URL('/account/home', nextUrl));
        }
        return true;
      }

      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/account/home', nextUrl));
      }

      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;