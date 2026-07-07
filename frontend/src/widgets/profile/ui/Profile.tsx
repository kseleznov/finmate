'use client';

import { SignInForm, SignUpForm } from '@/features/auth';
import { useProfile } from '../model/useProfile';
import styles from './Profile.module.css';

export function Profile() {
  const { user, isAuthenticated, logout, mode, setMode } = useProfile();

  if (!isAuthenticated || !user) {
    return (
      <div className={styles.authCard}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${mode === 'signIn' ? styles.tabActive : ''}`}
            onClick={() => setMode('signIn')}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`${styles.tab} ${mode === 'signUp' ? styles.tabActive : ''}`}
            onClick={() => setMode('signUp')}
          >
            Sign up
          </button>
        </div>

        {mode === 'signIn' ? <SignInForm /> : <SignUpForm />}
      </div>
    );
  }

  return (
    <div className={styles.profileCard}>
      <div className={styles.avatar}>{user.email[0]?.toUpperCase()}</div>
      <div className={styles.email}>{user.email}</div>
      <div className={styles.hint}>Твой аккаунт Finmate</div>

      <div className={styles.settingsList}>
        <div className={styles.settingsRow}>
          <span>Валюта</span>
          <span className={styles.settingsValue}>EUR</span>
        </div>
        <div className={styles.settingsRow}>
          <span>Уведомления</span>
          <span className={styles.settingsValue}>Включены</span>
        </div>
      </div>

      <button type="button" className={styles.logoutButton} onClick={logout}>
        Выйти
      </button>
    </div>
  );
}
