
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl
    const hostname = request.headers.get('host') || ''

    // Check for the specific subdomain "pinery-residences"
    // This handles both pinery-residences.domain.com and localhost for testing if configured
    if (hostname.includes('pinery-residences')) {
        // Only rewrite if we are at the root path, to allow assets and sub-paths to work if needed.
        // However, usually for a single page landing site, we might want to rewrite everything 
        // or just the root.
        // If we rewite everything to /pinery, we might break static assets if they are not relative.
        // But since /pinery is a page, let's rewrite the root.

        if (url.pathname === '/') {
            return NextResponse.rewrite(new URL('/pinery', request.url))
        }
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
