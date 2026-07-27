'use client';

import { useCategoriesList } from '../model/useCategoriesList';
import { CategoryCard } from '@/entities/category';
import { useTranslation } from '@/entities/locale';
import { Button } from '@/shared/ui/button';
import styles from './CategoriesList.module.css';

export function CategoriesList() {
  const { formatAmount, categories, VISIBLE_COUNT, expanded, setExpanded, visibleCategories } =
    useCategoriesList();
  const { t } = useTranslation();

  return (
    <section className={styles.categories}>
      <h2 className={styles.sectionTitle}>{t('categories.title')}</h2>

      {categories.length === 0 ? (
        <div className={styles.emptyHint}>{t('categories.emptyHint')}</div>
      ) : (
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
                subtitle={t('categories.remaining', { amount: formatAmount(category.remaining) })}
                percent={percent}
              />
            );
          })}
        </div>
      )}

      {categories.length > VISIBLE_COUNT && (
        <Button className={styles.toggleButton} onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? t('categories.collapse') : t('categories.showAll')}
        </Button>
      )}
    </section>
  );
}
