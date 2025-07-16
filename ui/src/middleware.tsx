// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log("Welcome Here");
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico|api).*)'], // optional
};
