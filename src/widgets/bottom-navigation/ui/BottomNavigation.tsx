import styles from './BottomNavigation.module.css';

export function BottomNavigation() {
  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navItem}>Overview</div>
      <div className={styles.plusButton}>+</div>
      <div className={styles.navItem}>Budget</div>
    </nav>
  );
}
