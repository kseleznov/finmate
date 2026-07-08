import { useState } from 'react';
import { BudgetLimitCard } from '@/entities/budget-limit-card';
import { useTranslation } from '@/entities/locale';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';
import { AddCategoryForm } from './AddCategoryForm';
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
  onDeleteCategory: (id: string) => Promise<boolean>;
  isAddingCategory: boolean;
  setIsAddingCategory: (value: boolean) => void;
  addCategoryError: string | null;
  onAddCategory: (input: { name: string; icon: string; color: string }) => Promise<boolean>;
}

export function BudgetLimitsList({
  formatAmount,
  categories,
  editingCategoryId,
  setEditingCategoryId,
  updateCategoryLimit,
  onDeleteCategory,
  isAddingCategory,
  setIsAddingCategory,
  addCategoryError,
  onAddCategory,
}: Props) {
  const { t } = useTranslation();

  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: string, title: string) => {
    setPendingDelete({ id, title });
    setDeleteError(null);
  };

  const handleCancelDelete = () => {
    setPendingDelete(null);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;

    setIsDeleting(true);
    const ok = await onDeleteCategory(pendingDelete.id);
    setIsDeleting(false);

    if (ok) {
      setPendingDelete(null);
    } else {
      setDeleteError(t('budget.errorDeleteCategory'));
    }
  };

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
            deleteAriaLabel={t('budget.deleteCategory', { title: category.title })}
            onChangeLimit={(value) => updateCategoryLimit(category.id, value)}
            onStartEdit={() => setEditingCategoryId(category.id)}
            onFinishEdit={() => setEditingCategoryId(null)}
            onDelete={() => handleDeleteClick(category.id, category.title)}
          />
        ))}

        <AddCategoryForm
          isAdding={isAddingCategory}
          setIsAdding={setIsAddingCategory}
          error={addCategoryError}
          onSubmit={onAddCategory}
        />
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title={t('budget.deleteCategoryTitle')}
        message={
          pendingDelete ? t('budget.confirmDeleteCategory', { title: pendingDelete.title }) : ''
        }
        confirmLabel={t('common.delete')}
        cancelLabel={t('common.cancel')}
        error={deleteError}
        isConfirming={isDeleting}
        danger
        onConfirm={() => void handleConfirmDelete()}
        onCancel={handleCancelDelete}
      />
    </section>
  );
}
