import { BudgetLimitCard } from '@/entities/budget-limit-card';
import styles from './BudgetLimitsList.module.css';

interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
  limit: number;
}

interface Props {
  formatAmount: (amount: number) => string;
  categories: Category[];
  editingCategoryId: string | null;
  setEditingCategoryId: (id: string | null) => void;
  updateCategoryLimit: (id: string, limit: number) => void;
}

export function BudgetLimitsList({
  formatAmount,
  categories,
  editingCategoryId,
  setEditingCategoryId,
  updateCategoryLimit,
}: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Category limits</h2>

      <div className={styles.list}>
        {categories.map((category) => (
          <BudgetLimitCard
            key={category.id}
            title={category.title}
            icon={category.icon}
            color={category.color}
            amount={formatAmount(category.limit)}
            limit={category.limit}
            isEditing={editingCategoryId === category.id}
            onChangeLimit={(value) => updateCategoryLimit(category.id, value)}
            onStartEdit={() => setEditingCategoryId(category.id)}
            onFinishEdit={() => setEditingCategoryId(null)}
          />
        ))}
      </div>
    </section>
  );
}
