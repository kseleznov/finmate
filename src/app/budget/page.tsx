import styles from '../page.module.css';
import { Header } from '@/widgets/header';
import { BottomNavigation } from '@/widgets/bottom-navigation';

export default function BudgetPage() {
  return (
    <main className={styles.container}>
      <Header />
      <p>Бюджет скоро появится здесь.</p>
      <BottomNavigation />
    </main>
  );
}
