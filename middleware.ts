import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: request.cookies?.toString(),
    },
    credentials: "include",
    cache: "no-store",
  });
  const data = await res.json();
  if (data.status === 'Unauthorized') {
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/dashboard/:path*',
}
