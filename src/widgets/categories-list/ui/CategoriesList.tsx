'use client';

import { useState } from 'react';
import { useCategoriesList } from '../model/useCategoriesList';
import CategoryCard from '@/entities/сategory-сard/CategoryCard';
import styles from './CategoriesList.module.css';

export function CategoriesList() {
  const { formatAmount, categories, VISIBLE_COUNT, expanded, setExpanded, visibleCategories } =
    useCategoriesList();

  return (
    <section className={styles.categories}>
      <h2 className={styles.sectionTitle}>Categories</h2>

      <div className={styles.list}>
        {visibleCategories.map((category) => {
          const budget = category.spent + category.remaining;
          const percent = Math.round((category.spent / budget) * 100);

          return (
            <CategoryCard
              key={category.title}
              title={category.title}
              icon={category.icon}
              color={category.color}
              amount={formatAmount(category.spent)}
              subtitle={`Remaining ${formatAmount(category.remaining)}`}
              percent={percent}
            />
          );
        })}
      </div>

      {categories.length > VISIBLE_COUNT && (
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Collapse' : 'Show all'}
        </button>
      )}
    </section>
  );
}
