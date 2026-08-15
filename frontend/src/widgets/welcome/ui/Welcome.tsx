'use client';

import { Logo } from '@/shared/ui/Logo';
import { Button } from '@/shared/ui/button';
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
        <Button href="/profile?mode=signUp" className={styles.signUpButton}>
          {t('auth.signUp')}
        </Button>
        <Button href="/profile?mode=signIn" className={styles.signInButton}>
          {t('auth.signIn')}
        </Button>
      </div>
    </div>
  );
}
