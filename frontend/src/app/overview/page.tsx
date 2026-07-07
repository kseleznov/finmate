'use client';

import styles from './page.module.css';
import { Header } from '@/widgets/header';
import { Donut } from '@/widgets/donut';
import { CategoriesList } from '@/widgets/categories-list';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { Welcome } from '@/widgets/welcome';
import { useAuth } from '@/entities/user';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <main className={styles.container}>
      {isAuthenticated ? (
        <>
          <Header />

          <section className={styles.chartSection}>
            <Donut />
          </section>

          <CategoriesList />
        </>
      ) : (
        <Welcome />
      )}

      <BottomNavigation />
    </main>
  );
}
