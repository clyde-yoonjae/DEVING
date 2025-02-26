'use server';

import { cookies } from 'next/headers';

export async function getAccessToken() {
  const cookieStore = cookies();
  return cookieStore.get('token')?.value || null;
}

export async function removeAccessToken() {
  const cookieStore = cookies();
  cookieStore.delete('token');
}

export async function setAccessToken(token: string) {
  const cookieStore = cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    // sameSite: 'strict', // 개발환경에서는 불필요
    sameSite: 'none',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });
}
