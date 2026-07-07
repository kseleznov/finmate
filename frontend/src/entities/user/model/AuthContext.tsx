'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { getRawUser, saveSession, clearSession } from '@/shared/api/session';
import type { StoredUser } from '@/shared/api/session';

type Listener = () => void;

const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

let cachedRawUser: string | null = null;
let cachedUser: StoredUser | null = null;

function getSnapshot(): StoredUser | null {
  const rawUser = getRawUser();

  if (rawUser !== cachedRawUser) {
    cachedRawUser = rawUser;
    try {
      cachedUser = rawUser ? (JSON.parse(rawUser) as StoredUser) : null;
    } catch {
      cachedUser = null;
    }
  }

  return cachedUser;
}

function getServerSnapshot(): StoredUser | null {
  return null;
}

interface AuthContextValue {
  user: StoredUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: StoredUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const login = (token: string, nextUser: StoredUser) => {
    saveSession(token, nextUser);
    notify();
  };

  const logout = () => {
    clearSession();
    notify();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
