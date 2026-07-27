'use client';

import { useState } from 'react';
import { useTranslation } from '@/entities/locale';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/Input';
import styles from './AddCategoryForm.module.css';

interface Props {
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  error: string | null;
  onSubmit: (input: { name: string; icon: string; color: string }) => Promise<boolean>;
}

const DEFAULT_ICON = '🏷️';
const DEFAULT_COLOR = '#6d28d9';

export function AddCategoryForm({ isAdding, setIsAdding, error, onSubmit }: Props) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(DEFAULT_ICON);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [nameError, setNameError] = useState(false);

  if (!isAdding) {
    return (
      <Button className={styles.addButton} onClick={() => setIsAdding(true)}>
        + {t('budget.addCategory')}
      </Button>
    );
  }

  const reset = () => {
    setName('');
    setIcon(DEFAULT_ICON);
    setColor(DEFAULT_COLOR);
    setNameError(false);
  };

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError(true);
      return;
    }

    const ok = await onSubmit({ name: trimmedName, icon: icon.trim() || DEFAULT_ICON, color });
    if (ok) {
      reset();
    }
  };

  const handleCancel = () => {
    reset();
    setIsAdding(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <Input
          type="text"
          className={styles.iconInput}
          value={icon}
          maxLength={4}
          onChange={(event) => setIcon(event.target.value)}
          aria-label={t('budget.categoryIconPlaceholder')}
        />
        <div className={styles.colorSwatch} style={{ background: color }}>
          <Input
            type="color"
            className={styles.colorInput}
            value={color}
            onChange={(event) => setColor(event.target.value)}
            aria-label={t('budget.categoryColorPlaceholder')}
          />
        </div>
        <Input
          type="text"
          className={styles.nameInput}
          placeholder={t('budget.categoryNamePlaceholder')}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setNameError(false);
          }}
          autoFocus
        />
      </div>

      {(nameError || error) && (
        <div className={styles.error}>
          {nameError ? t('budget.errorCategoryName') : t(`budget.${error}`)}
        </div>
      )}

      <div className={styles.actions}>
        <Button className={styles.cancelButton} onClick={handleCancel}>
          {t('common.cancel')}
        </Button>
        <Button className={styles.saveButton} onClick={handleSubmit}>
          {t('common.save')}
        </Button>
      </div>
    </div>
  );
}
