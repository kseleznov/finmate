'use client';

import { SignInForm, SignUpForm } from '@/features/auth';
import { CURRENCIES, useCurrency } from '@/entities/currency';
import { LOCALES, useTranslation } from '@/entities/locale';
import { useProfile } from '../model/useProfile';
import styles from './Profile.module.css';

export function Profile() {
  const { user, isAuthenticated, logout, mode, setMode } = useProfile();
  const { currency, setCurrency } = useCurrency();
  const { t, locale, setLocale } = useTranslation();

  if (!isAuthenticated || !user) {
    return (
      <div className={styles.authCard}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${mode === 'signIn' ? styles.tabActive : ''}`}
            onClick={() => setMode('signIn')}
          >
            {t('auth.signIn')}
          </button>
          <button
            type="button"
            className={`${styles.tab} ${mode === 'signUp' ? styles.tabActive : ''}`}
            onClick={() => setMode('signUp')}
          >
            {t('auth.signUp')}
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

      <div className={styles.settingsList}>
        <div className={styles.settingsRow}>
          <span>{t('profile.currency')}</span>
          <div className={styles.currencyGroup}>
            {CURRENCIES.map((item) => (
              <button
                key={item.code}
                type="button"
                className={`${styles.currencyButton} ${
                  currency === item.code ? styles.currencyButtonActive : ''
                }`}
                onClick={() => setCurrency(item.code)}
              >
                {item.code}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.settingsRow}>
          <span>{t('profile.language')}</span>
          <div className={styles.currencyGroup}>
            {LOCALES.map((item) => (
              <button
                key={item.code}
                type="button"
                className={`${styles.currencyButton} ${
                  locale === item.code ? styles.currencyButtonActive : ''
                }`}
                onClick={() => setLocale(item.code)}
              >
                {item.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button type="button" className={styles.logoutButton} onClick={logout}>
        {t('profile.logout')}
      </button>
    </div>
  );
}
