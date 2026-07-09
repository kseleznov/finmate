'use client';

import { useState } from 'react';
import { useOperationsList } from '../model/useOperationsList';
import { OperationCard } from '@/entities/operation-card';
import { useTranslation } from '@/entities/locale';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';
import styles from './OperationsList.module.css';

export function OperationsList() {
  const { formatAmount, groups, isLoading, deleteOperation } = useOperationsList();
  const { t } = useTranslation();

  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancelDelete = () => {
    setPendingDelete(null);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;

    setIsDeleting(true);
    const ok = await deleteOperation(pendingDelete.id);
    setIsDeleting(false);

    if (ok) {
      setPendingDelete(null);
    } else {
      setDeleteError(t('operations.errorDeleteOperation'));
    }
  };

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
                deleteAriaLabel={t('operations.deleteOperation', { title: operation.title })}
                onDelete={() => {
                  setPendingDelete({ id: operation.id, title: operation.title });
                  setDeleteError(null);
                }}
              />
            ))}
          </div>
        </section>
      ))}

      <ConfirmDialog
        open={pendingDelete !== null}
        title={t('operations.deleteOperationTitle')}
        message={
          pendingDelete
            ? t('operations.confirmDeleteOperation', { title: pendingDelete.title })
            : ''
        }
        confirmLabel={t('common.delete')}
        cancelLabel={t('common.cancel')}
        error={deleteError}
        isConfirming={isDeleting}
        danger
        onConfirm={() => void handleConfirmDelete()}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
