import { create } from 'zustand';
import { getSession, saveSession, clearSession, getToken } from '@/shared/api/session';
import type { StoredUser } from '@/shared/api/session';

interface AuthState {
  user: StoredUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: StoredUser) => void;
  logout: () => void;
  updateUser: (user: StoredUser) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: getSession()?.user ?? null,
  isAuthenticated: !!getSession(),

  login: (token, nextUser) => {
    saveSession(token, nextUser);
    set({ user: nextUser, isAuthenticated: true });
  },

  logout: () => {
    clearSession();
    set({ user: null, isAuthenticated: false });
  },

  updateUser: (nextUser) => {
    const token = getToken();
    if (!token) return;

    saveSession(token, nextUser);
    set({ user: nextUser });
  },
}));
