import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectpath = ['/cartpage', '/profile'];
const authpath = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (protectpath.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      const loginUrl = new URL('/login', process.env.NEXT_PUBLIC_URL);
      
      loginUrl.searchParams.set('callback', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Auth routes (login/register)
  if (authpath.includes(req.nextUrl.pathname)) {
    if (token) {
      const homeUrl = new URL('/', process.env.NEXT_PUBLIC_URL);
      
      return NextResponse.redirect(homeUrl);
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
