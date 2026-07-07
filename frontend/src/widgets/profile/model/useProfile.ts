'use client';

import { useState } from 'react';
import { useAuth } from '@/entities/user';

export function useProfile() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');

  return { user, isAuthenticated, logout, mode, setMode };
}
