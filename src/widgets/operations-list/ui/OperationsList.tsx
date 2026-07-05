import { useOperationsList } from '../model/useOperationsList';
import { OperationCard } from '@/entities/operation-card';
import styles from './OperationsList.module.css';

export function OperationsList() {
  const { formatAmount, groups } = useOperationsList();

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
