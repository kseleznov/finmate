import { BudgetLimitCard } from '@/entities/budget-limit-card';
import { useTranslation } from '@/entities/locale';
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
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{t('budget.categoryLimits')}</h2>

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
            editAriaLabel={t('budget.editLimit', { title: category.title })}
            onChangeLimit={(value) => updateCategoryLimit(category.id, value)}
            onStartEdit={() => setEditingCategoryId(category.id)}
            onFinishEdit={() => setEditingCategoryId(null)}
          />
        ))}
      </div>
    </section>
  );
}
