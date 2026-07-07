import { Logo } from '@/shared/ui/Logo';
import { useHeader } from '../model/useHeader';
import styles from './Header.module.css';

export function Header() {
  const { spent, total, daysRemaining, formatAmount, percent, left } = useHeader();

  return (
    <header className={styles.card}>
      <Logo className={styles.logo} />

      <div className={styles.budget}>
        <div className={styles.amountRow}>
          <span className={styles.amount}>{formatAmount(spent)}</span>
          <span className={styles.total}>/ {formatAmount(total)}</span>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${percent}%` }} />
        </div>

        <div className={styles.bottomRow}>
          <span className={styles.left}>{formatAmount(left)} left</span>
          <span className={styles.separator}>·</span>
          <span className={styles.daysRemaining}>{daysRemaining} days remaining</span>
        </div>
      </div>
    </header>
  );
}
