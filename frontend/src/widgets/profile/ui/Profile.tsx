'use client';

import { useState } from 'react';
import { AuthCard } from '@/features/auth';
import { PaydaySelect } from '@/features/update-payday';
import { UsernameForm } from '@/features/update-username';
import { useCurrency } from '@/entities/currency';
import { useTranslation } from '@/entities/locale';
import { Button } from '@/shared/ui/button';
import { ChipGroup } from '@/shared/ui/ChipGroup';
import { PencilIcon } from './icons';
import { useAuth } from '@/entities/user';
import styles from './Profile.module.css';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { currency, setCurrency, currencyItems } = useCurrency();
  const { t, locale, setLocale, localeItems } = useTranslation();
  const { user, logout } = useAuth();

  if (!user) {
    return <AuthCard />;
  }

  return (
    <div className={styles.profileCard}>
      <div className={styles.avatar}>{user.username[0]?.toUpperCase()}</div>

      {isEditing ? (
        <UsernameForm onDone={() => setIsEditing(false)} />
      ) : (
        <div className={styles.usernameRow}>
          <div className={styles.email}>{user.username}</div>

          <Button
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
            aria-label={t('profile.editUsername')}
          >
            <PencilIcon />
          </Button>
        </div>
      )}

      <div className={styles.settingsList}>
        <div className={styles.settingsRow}>
          <span>{t('profile.currency')}</span>
          <ChipGroup items={currencyItems} value={currency} onChange={setCurrency} />
        </div>

        <div className={styles.settingsRow}>
          <span>{t('profile.payday')}</span>
          <PaydaySelect />
        </div>

        <div className={styles.settingsRow}>
          <span>{t('profile.language')}</span>
          <ChipGroup items={localeItems} value={locale} onChange={setLocale} />
        </div>
      </div>

      <Button className={styles.logoutButton} onClick={() => logout()}>
        {t('profile.logout')}
      </Button>
    </div>
  );
}
