import styles from './page.module.css';
import { AddOperation } from '@/features/add-operation';

export default function AddPage() {
  return (
    <main className={styles.container}>
      <AddOperation />
    </main>
  );
}
