'use client';

import styles from './page.module.css';
import { Budget } from '@/widgets/budget';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { useTranslation } from '@/entities/locale';

export default function BudgetPage() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{t('pages.budget')}</h1>

      <Budget />

      <BottomNavigation />
    </main>
  );
}
