import { useTranslation } from '@/entities/locale';
import { PencilIcon } from './PencilIcon';
import styles from './BudgetSummary.module.css';

interface Props {
  formatAmount: (amount: number) => string;
  income: number;
  setIncome: (income: number) => void;
  isEditingIncome: boolean;
  setIsEditingIncome: (value: boolean) => void;
  allocated: number;
  leftToAllocate: number;
}

export function BudgetSummary({
  formatAmount,
  income,
  setIncome,
  isEditingIncome,
  setIsEditingIncome,
  allocated,
  leftToAllocate,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <div className={styles.label}>{t('budget.expectedIncome')}</div>
          {isEditingIncome ? (
            <input
              type="number"
              className={styles.incomeInput}
              value={income}
              onChange={(event) => setIncome(Number(event.target.value) || 0)}
              onBlur={() => setIsEditingIncome(false)}
              onKeyDown={(event) => event.key === 'Enter' && setIsEditingIncome(false)}
              autoFocus
            />
          ) : (
            <div className={styles.amount}>{formatAmount(income)}</div>
          )}
        </div>

        <button
          type="button"
          className={styles.editButton}
          onClick={() => setIsEditingIncome(true)}
          aria-label={t('budget.editIncome')}
        >
          <PencilIcon />
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.statsRow}>
        <div>
          <div className={styles.statLabel}>{t('budget.allocated')}</div>
          <div className={styles.statValue}>{formatAmount(allocated)}</div>
        </div>
        <div className={styles.statRight}>
          <div className={styles.statLabel}>{t('budget.leftToAllocate')}</div>
          <div className={styles.statValue}>{formatAmount(leftToAllocate)}</div>
        </div>
      </div>
    </div>
  );
}
