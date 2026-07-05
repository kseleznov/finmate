import Link from 'next/link';
import styles from './page.module.css';

export default function AddPage() {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.closeLink} aria-label="Закрыть">
          ×
        </Link>
        <h1 className={styles.title}>Новая заметка</h1>
      </div>

      <p>Форма создания заметки скоро появится здесь.</p>
    </main>
  );
}
