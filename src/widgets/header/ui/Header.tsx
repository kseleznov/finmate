import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftText}>Remaining this month</div>
      <div className={styles.balance}>93 900 €</div>
      <div className={styles.pill}>Income: 120 000 € • Expenses: 26 100 €</div>
    </header>
  );
}
