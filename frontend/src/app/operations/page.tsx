'use client';

import styles from './page.module.css';
import { OperationsList } from '@/widgets/operations-list';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { useTranslation } from '@/entities/locale';

export default function OperationsPage() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{t('pages.operations')}</h1>

      <OperationsList />

      <BottomNavigation />
    </main>
  );
}
