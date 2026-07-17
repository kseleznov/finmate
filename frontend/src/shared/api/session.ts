import type { StoredUser } from './types';

export function parseUserCookie(raw: string | undefined): StoredUser | null {
  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw)) as StoredUser;
  } catch {
    return null;
  }
}
