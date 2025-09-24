import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    console.log("path: ", path)
    const isPathPublic  = path === '/login' || path === '/' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''

    if(isPathPublic && token)
        return NextResponse.redirect(new URL('/profile', request.url))

    if(!isPathPublic && !token)
        return NextResponse.redirect(new URL("/login", request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[ 
    '/',
    '/profile/:id*',
    '/login',
    '/signup',
    '/verifyemail'
    ],
}