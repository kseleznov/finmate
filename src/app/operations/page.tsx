import styles from './page.module.css';
import { OperationsList } from '@/widgets/operations-list';
import { BottomNavigation } from '@/widgets/bottom-navigation';

export default function OperationsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Operations</h1>

      <OperationsList />

      <BottomNavigation />
    </main>
  );
}
