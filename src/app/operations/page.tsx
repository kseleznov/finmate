import styles from '../page.module.css';
import { Header } from '@/widgets/header';
import { BottomNavigation } from '@/widgets/bottom-navigation';

export default function OperationsPage() {
  return (
    <main className={styles.container}>
      <Header />
      <p>Список операций скоро появится здесь.</p>
      <BottomNavigation />
    </main>
  );
}
