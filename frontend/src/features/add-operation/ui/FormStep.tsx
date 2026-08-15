import clsx from 'clsx';
import { useCurrency } from '@/entities/currency';
import { getCurrencySymbol } from '@/shared/lib/currency';
import { useTranslation } from '@/entities/locale';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/Input';
import type { useAddOperation } from '../model/useAddOperation';
import styles from './FormStep.module.css';

type Props = ReturnType<typeof useAddOperation>;

export function FormStep({
  amount,
  setAmount,
  incrementAmount,
  decrementAmount,
  title,
  setTitle,
  categories,
  categoryId,
  setCategoryId,
  handleSubmit,
  error,
  isSubmitting,
}: Props) {
  const { currency } = useCurrency();
  const { t } = useTranslation();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="amount">
          {t('addOperation.amountLabel', { symbol: getCurrencySymbol(currency) })}
        </label>
        <div className={styles.amountRow}>
          <Input
            id="amount"
            type="number"
            className={styles.amountInput}
            placeholder="0"
            value={amount === 0 ? '' : amount}
            onChange={(event) => setAmount(Number(event.target.value) || 0)}
          />
          <div className={styles.stepper}>
            <Button
              className={styles.stepperButton}
              onClick={incrementAmount}
              aria-label={t('addOperation.increaseAmount')}
            >
              ▲
            </Button>
            <Button
              className={styles.stepperButton}
              onClick={decrementAmount}
              aria-label={t('addOperation.decreaseAmount')}
            >
              ▼
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">
          {t('addOperation.whatDidYouBuy')}
        </label>
        <Input
          id="title"
          type="text"
          className={styles.textInput}
          placeholder={t('addOperation.titlePlaceholder')}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>{t('addOperation.category')}</span>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Button
              key={category.id}
              className={clsx(
                styles.categoryButton,
                categoryId === category.id && styles.categoryButtonActive
              )}
              onClick={() => setCategoryId(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryLabel}>{category.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {error && <span className={styles.error}>{error}</span>}

      <Button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? t('addOperation.saving') : t('addOperation.submit')}
      </Button>
    </form>
  );
}
