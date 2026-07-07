import styles from './page.module.css';
import { Budget } from '@/widgets/budget';
import { BottomNavigation } from '@/widgets/bottom-navigation';

export default function BudgetPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Monthly budget</h1>

      <Budget />

      <BottomNavigation />
    </main>
  );
}
