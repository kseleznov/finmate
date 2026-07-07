'use client';

import { useBudget } from '../model/useBudget';
import { BudgetSummary } from './BudgetSummary';
import { BudgetLimitsList } from './BudgetLimitsList';

export function Budget() {
  const vm = useBudget();

  if (vm.isLoading) {
    return null;
  }

  return (
    <>
      <BudgetSummary
        formatAmount={vm.formatAmount}
        income={vm.income}
        setIncome={vm.setIncome}
        isEditingIncome={vm.isEditingIncome}
        setIsEditingIncome={vm.setIsEditingIncome}
        allocated={vm.allocated}
        leftToAllocate={vm.leftToAllocate}
      />

      <BudgetLimitsList
        formatAmount={vm.formatAmount}
        categories={vm.categories}
        editingCategoryId={vm.editingCategoryId}
        setEditingCategoryId={vm.setEditingCategoryId}
        updateCategoryLimit={vm.updateCategoryLimit}
      />
    </>
  );
}
