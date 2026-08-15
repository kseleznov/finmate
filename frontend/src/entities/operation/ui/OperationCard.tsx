import { Button } from '@/shared/ui/button';
import { TrashIcon } from './icons';
import styles from './OperationCard.module.css';

interface Props {
  title: string;
  subtitle?: string;
  amount: string;
  icon?: string;
  color?: string;
  deleteAriaLabel?: string;
  onDelete?: () => void;
}

export function OperationCard({
  title,
  subtitle,
  amount,
  icon = '💳',
  color = '#6366f1',
  deleteAriaLabel,
  onDelete,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.icon} style={{ background: `${color}24` }}>
          {icon}
        </div>
        <div>
          <div className={styles.title}>{title}</div>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.amount}>{amount}</div>
        {onDelete && (
          <Button className={styles.deleteButton} onClick={onDelete} aria-label={deleteAriaLabel}>
            <TrashIcon />
          </Button>
        )}
      </div>
    </div>
  );
}
