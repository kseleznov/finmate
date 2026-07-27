import { useTranslation } from '@/entities/locale';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/Input';
import { PencilIcon } from './icons';
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
  income,
  isEditingIncome,
  allocated,
  leftToAllocate,
  setIncome,
  setIsEditingIncome,
  formatAmount,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <div className={styles.label}>{t('budget.expectedIncome')}</div>
          {isEditingIncome ? (
            <Input
              type="number"
              className={styles.incomeInput}
              placeholder="0"
              value={income === 0 ? '' : income}
              onChange={(event) => setIncome(Number(event.target.value) || 0)}
              onBlur={() => setIsEditingIncome(false)}
              onKeyDown={(event) => event.key === 'Enter' && setIsEditingIncome(false)}
              autoFocus
            />
          ) : (
            <div className={styles.amount}>{formatAmount(income)}</div>
          )}
        </div>

        <Button
          className={styles.editButton}
          onClick={() => setIsEditingIncome(true)}
          aria-label={t('budget.editIncome')}
        >
          <PencilIcon />
        </Button>
      </div>

      {income > 0 && (
        <>
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
        </>
      )}
    </div>
  );
}
