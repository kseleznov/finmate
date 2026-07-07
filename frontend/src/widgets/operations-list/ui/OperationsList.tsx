'use client';

import { useOperationsList } from '../model/useOperationsList';
import { OperationCard } from '@/entities/operation-card';
import { useTranslation } from '@/entities/locale';
import styles from './OperationsList.module.css';

export function OperationsList() {
  const { formatAmount, groups, isLoading } = useOperationsList();
  const { t } = useTranslation();

  if (isLoading) {
    return null;
  }

  if (groups.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🧾</div>
        <div className={styles.emptyTitle}>{t('operations.emptyTitle')}</div>
        <div className={styles.emptySubtitle}>{t('operations.emptySubtitle')}</div>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <section key={group.date} className={styles.group}>
          <h2 className={styles.sectionTitle}>{group.date}</h2>

          <div className={styles.items}>
            {group.operations.map((operation) => (
              <OperationCard
                key={operation.id}
                title={operation.title}
                subtitle={operation.subtitle}
                icon={operation.icon}
                color={operation.color}
                amount={formatAmount(operation.amount)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
