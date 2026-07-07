import styles from './CategoryCard.module.css';

interface Props {
  title: string;
  subtitle?: string;
  amount?: string;
  icon?: string;
  color?: string;
  percent?: number;
}

export function CategoryCard({
  title,
  subtitle,
  amount,
  icon = '☕️',
  color = '#f59e0b',
  percent = 0,
}: Props) {
  const clampedPercent = Math.min(100, Math.max(0, percent));

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.cardLeft}>
          <div className={styles.icon} style={{ background: `${color}24` }}>
            {icon}
          </div>
          <div>
            <div className={styles.cardTitle}>{title}</div>
            {subtitle && <div className={styles.cardSubtitle}>{subtitle}</div>}
          </div>
        </div>
        <div className={styles.cardAmount}>{amount}</div>
      </div>

      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${clampedPercent}%`, background: color }}
        />
      </div>
    </div>
  );
}
