'use client';

import { useTranslation } from '@/entities/locale';
import { Button } from '@/shared/ui/button';
import { useAuthCard } from '../model/useAuthCard';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { TABS } from '../model/constants';
import clsx from 'clsx';
import styles from './AuthCard.module.css';

export function AuthCard() {
  const { t } = useTranslation();
  const { mode, setMode } = useAuthCard();

  return (
    <div className={styles.authCard}>
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <Button
            key={tab.mode}
            className={clsx(styles.tab, mode === tab.mode && styles.tabActive)}
            onClick={() => setMode(tab.mode)}
          >
            {t(tab.labelKey)}
          </Button>
        ))}
      </div>

      {mode === 'signIn' ? <SignInForm /> : <SignUpForm />}
    </div>
  );
}
