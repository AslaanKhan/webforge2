// import { NextResponse } from 'next/server'
// import { NextRequest } from 'next/server'

// // Define your public routes
// const PUBLIC_ROUTES = ['/site', '/api/uploadthing', '/agency/sign-in' ]

// export default async function middleware(req: NextRequest) {
//   const url = req.nextUrl
//   const searchParams = url.searchParams.toString()
//   const hostname = req.headers.get('host') || ''

//   const pathWithSearchParams = `${url.pathname}${
//     searchParams.length > 0 ? `?${searchParams}` : ''
//   }`

//   // Check if the request is for a public route
//   if (PUBLIC_ROUTES.includes(url.pathname)) {
//     return NextResponse.next()
//   }

//   // Simulate the authentication check
//   const isAuthenticated = Boolean(req.cookies.get('your-auth-cookie')) // Replace with your authentication logic

//   if (!isAuthenticated) {
//     if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
//       return NextResponse.redirect(new URL('/agency/sign-in', req.url))
//     }

//     // Redirect to sign-in if not authenticated and accessing a protected route
//     return NextResponse.redirect(new URL('/sign-in', req.url))
//   }

//   // Handle custom subdomains
//   const customSubDomain = hostname
//     .split(process.env.NEXT_PUBLIC_DOMAIN!)
//     .filter(Boolean)[0]

//   if (customSubDomain) {
//     return NextResponse.rewrite(
//       new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
//     )
//   }

//   if (
//     url.pathname === '/' ||
//     (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)
//   ) {
//     return NextResponse.rewrite(new URL('/site', req.url))
//   }

//   if (
//     url.pathname.startsWith('/agency') ||
//     url.pathname.startsWith('/subaccount')
//   ) {
//     return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// }

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  '/',
  '/site',
  '/api/uploadthing',
]);

export default clerkMiddleware((auth, req) => {
  
    const url = req.nextUrl
    const searchParams = url.searchParams.toString()
    let hostname = req.headers
    const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''
      }`

    //if subdomain exists
    const customSubDomain = hostname
      .get('host')
      ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0]

    if (customSubDomain) {
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
      )
    }

    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
      return NextResponse.redirect(new URL(`/agency/sign-in`, req.url))
    }

    if (
      url.pathname === '/' ||
      (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)
    ) {
      return NextResponse.rewrite(new URL('/site', req.url))
    }

    if (
      url.pathname.startsWith('/agency') ||
      url.pathname.startsWith('/subaccount')
    ) {
      return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
    }


});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};