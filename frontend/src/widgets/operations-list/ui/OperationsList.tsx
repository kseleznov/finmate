import { useOperationsList } from '../model/useOperationsList';
import { OperationCard } from '@/entities/operation-card';
import styles from './OperationsList.module.css';

export function OperationsList() {
  const { formatAmount, groups } = useOperationsList();

  if (groups.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🧾</div>
        <div className={styles.emptyTitle}>No transactions yet</div>
        <div className={styles.emptySubtitle}>Your expenses will show up here once you add one</div>
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
                key={operation.title}
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
