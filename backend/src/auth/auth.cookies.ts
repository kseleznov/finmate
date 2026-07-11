import { CookieOptions, Response } from 'express';

export const ACCESS_TOKEN_COOKIE = 'finmate_token';
export const USER_COOKIE = 'finmate_user';
export const AUTH_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

interface CookieUser {
  id: string;
  email: string;
  username: string | null;
  payday: number | null;
}

const isProd = process.env.NODE_ENV === 'production';

const baseCookieOptions: CookieOptions = {
  secure: isProd,
  sameSite: 'lax',
  path: '/',
  maxAge: AUTH_COOKIE_MAX_AGE_MS,
};

export function setAuthCookies(
  res: Response,
  accessToken: string,
  user: CookieUser,
) {
  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
    ...baseCookieOptions,
    httpOnly: true,
  });
  setUserCookie(res, user);
}

export function setUserCookie(res: Response, user: CookieUser) {
  res.cookie(USER_COOKIE, JSON.stringify(user), {
    ...baseCookieOptions,
    httpOnly: false,
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_TOKEN_COOKIE, { path: '/' });
  res.clearCookie(USER_COOKIE, { path: '/' });
}
