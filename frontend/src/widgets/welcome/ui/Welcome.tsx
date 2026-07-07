'use client';

import Link from 'next/link';
import { Logo } from '@/shared/ui/Logo';
import { useWelcome } from '../model/useWelcome';
import styles from './Welcome.module.css';

export function Welcome() {
  const { t } = useWelcome();

  return (
    <div className={styles.card}>
      <Logo className={styles.logo} />
      <div className={styles.tagline}>{t('welcome.tagline')}</div>
      <p className={styles.description}>{t('welcome.description')}</p>

      <div className={styles.actions}>
        <Link href="/profile?mode=signUp" className={styles.signUpButton}>
          {t('auth.signUp')}
        </Link>
        <Link href="/profile?mode=signIn" className={styles.signInButton}>
          {t('auth.signIn')}
        </Link>
      </div>
    </div>
  );
}
