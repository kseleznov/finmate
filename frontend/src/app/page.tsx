import styles from './page.module.css';
import { Header } from '@/widgets/header';
import { Donut } from '@/widgets/donut';
import { CategoriesList } from '@/widgets/categories-list';
import { BottomNavigation } from '@/widgets/bottom-navigation';

export default function Home() {
  return (
    <main className={styles.container}>
      <Header />

      <section className={styles.chartSection}>
        <Donut />
      </section>

      <CategoriesList />

      <BottomNavigation />
    </main>
  );
}
