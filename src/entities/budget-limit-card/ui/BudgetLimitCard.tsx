import { PencilIcon } from './PencilIcon';
import styles from './BudgetLimitCard.module.css';

interface Props {
  title: string;
  icon: string;
  color: string;
  amount: string;
  limit: number;
  isEditing: boolean;
  onChangeLimit: (value: number) => void;
  onStartEdit: () => void;
  onFinishEdit: () => void;
}

export function BudgetLimitCard({
  title,
  icon,
  color,
  amount,
  limit,
  isEditing,
  onChangeLimit,
  onStartEdit,
  onFinishEdit,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.icon} style={{ background: `${color}24` }}>
          {icon}
        </div>
        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.right}>
        {isEditing ? (
          <input
            type="number"
            className={styles.input}
            value={limit}
            onChange={(event) => onChangeLimit(Number(event.target.value) || 0)}
            onBlur={onFinishEdit}
            onKeyDown={(event) => event.key === 'Enter' && onFinishEdit()}
            autoFocus
          />
        ) : (
          <>
            <span className={styles.amount}>{amount}</span>
            <button
              type="button"
              className={styles.editButton}
              onClick={onStartEdit}
              aria-label={`Edit ${title} limit`}
            >
              <PencilIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
