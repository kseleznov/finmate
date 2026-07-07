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
}: Props) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="amount">
          Amount (€)
        </label>
        <div className={styles.amountRow}>
          <input
            id="amount"
            type="number"
            className={styles.amountInput}
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value) || 0)}
          />
          <div className={styles.stepper}>
            <button
              type="button"
              className={styles.stepperButton}
              onClick={incrementAmount}
              aria-label="Increase amount"
            >
              ▲
            </button>
            <button
              type="button"
              className={styles.stepperButton}
              onClick={decrementAmount}
              aria-label="Decrease amount"
            >
              ▼
            </button>
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">
          What did you buy?
        </label>
        <input
          id="title"
          type="text"
          className={styles.textInput}
          placeholder="e.g. Coffee at Starbucks"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Category</span>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${styles.categoryButton} ${
                categoryId === category.id ? styles.categoryButtonActive : ''
              }`}
              onClick={() => setCategoryId(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryLabel}>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Add operation
      </button>
    </form>
  );
}
