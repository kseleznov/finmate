'use client';

import { useBudget } from '../model/useBudget';
import { BudgetSummary } from './BudgetSummary';
import { BudgetLimitsList } from './BudgetLimitsList';

export function Budget() {
  const {
    isPending,
    income,
    isEditingIncome,
    incomeError,
    allocated,
    leftToAllocate,
    categories,
    editingCategoryId,
    isAddingCategory,
    addCategoryError,
    formatAmount,
    setIncome,
    setEditingCategoryId,
    updateCategoryLimit,
    deleteCategory,
    setIsAddingCategory,
    setIsEditingIncome,
    addCategory,
  } = useBudget();

  if (isPending) {
    return null;
  }

  return (
    <>
      <BudgetSummary
        formatAmount={formatAmount}
        income={income}
        setIncome={setIncome}
        isEditingIncome={isEditingIncome}
        setIsEditingIncome={setIsEditingIncome}
        incomeError={incomeError}
        allocated={allocated}
        leftToAllocate={leftToAllocate}
      />

      <BudgetLimitsList
        formatAmount={formatAmount}
        categories={categories}
        editingCategoryId={editingCategoryId}
        setEditingCategoryId={setEditingCategoryId}
        updateCategoryLimit={updateCategoryLimit}
        onDeleteCategory={deleteCategory}
        isAddingCategory={isAddingCategory}
        setIsAddingCategory={setIsAddingCategory}
        addCategoryError={addCategoryError}
        onAddCategory={addCategory}
      />
    </>
  );
}
