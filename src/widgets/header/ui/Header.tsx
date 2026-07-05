import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftText}>Remaining this month</div>
      <div className={styles.balance}>0 €</div>
      <div className={styles.pill}>Income: 0 € • Expenses: 0 €</div>
    </header>
  );
}
