import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/Input';
import { PencilIcon, TrashIcon } from './icons';
import styles from './BudgetLimitCard.module.css';

interface Props {
  title: string;
  icon: string;
  color: string;
  amount: string;
  limit: number;
  isEditing: boolean;
  editAriaLabel: string;
  deleteAriaLabel: string;
  onChangeLimit: (value: number) => void;
  onStartEdit: () => void;
  onFinishEdit: () => void;
  onDelete: () => void;
}

export function BudgetLimitCard({
  title,
  icon,
  color,
  amount,
  limit,
  isEditing,
  editAriaLabel,
  deleteAriaLabel,
  onChangeLimit,
  onStartEdit,
  onFinishEdit,
  onDelete,
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
          <Input
            type="number"
            className={styles.input}
            placeholder="0"
            value={limit === 0 ? '' : limit}
            onChange={(event) => onChangeLimit(Number(event.target.value) || 0)}
            onBlur={onFinishEdit}
            onKeyDown={(event) => event.key === 'Enter' && onFinishEdit()}
            autoFocus
          />
        ) : (
          <>
            <span className={styles.amount}>{amount}</span>
            <Button className={styles.editButton} onClick={onStartEdit} aria-label={editAriaLabel}>
              <PencilIcon />
            </Button>
            <Button className={styles.deleteButton} onClick={onDelete} aria-label={deleteAriaLabel}>
              <TrashIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
