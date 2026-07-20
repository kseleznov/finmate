import type { StoredUser } from './types';

export function parseUserCookie(cookie: string | undefined): StoredUser | null {
  if (!cookie) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(cookie)) as StoredUser;
  } catch {
    return null;
  }
}
