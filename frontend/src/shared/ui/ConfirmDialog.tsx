'use client';

import { useEffect } from 'react';
import { Button } from './button';
import styles from './ConfirmDialog.module.css';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  error?: string | null;
  isConfirming?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  error,
  isConfirming = false,
  danger = false,
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="confirm-dialog-title" className={styles.title}>
          {title}
        </h3>
        <p className={styles.message}>{message}</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <Button className={styles.cancelButton} onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            className={danger ? styles.dangerButton : styles.confirmButton}
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
