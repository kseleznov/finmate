'use client';

import { Suspense } from 'react';
import styles from './page.module.css';
import { Profile } from '@/widgets/profile';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { useTranslation } from '@/entities/locale';

export default function ProfilePage() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{t('pages.profile')}</h1>

      <Suspense fallback={null}>
        <Profile />
      </Suspense>

      <BottomNavigation />
    </main>
  );
}
