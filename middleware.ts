import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 보호된 라우트 목록
const PROTECTED_ROUTES = ['/products/new', '/products/*/edit', '/mypage'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refresh_token');

  // 보호된 라우트 체크
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => {
    if (route.includes('*')) {
      const pattern = route.replace('*', '.*');
      return new RegExp(pattern).test(pathname);
    }
    return pathname.startsWith(route);
  });

  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/products/new', '/products/:id/edit', '/mypage/:path*'],
};
