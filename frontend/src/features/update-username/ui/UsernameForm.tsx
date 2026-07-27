'use client';

import { useTranslation } from '@/entities/locale';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/Input';
import { useUpdateUsername } from '../model/useUpdateUsername';
import styles from './UsernameForm.module.css';

interface Props {
  onDone: () => void;
}

export function UsernameForm({ onDone }: Props) {
  const { t } = useTranslation();
  const { error, isPending, register, save, cancel, handleKeyDown } = useUpdateUsername(onDone);

  return (
    <div className={styles.usernameEdit}>
      <Input
        type="text"
        className={styles.usernameInput}
        onKeyDown={handleKeyDown}
        autoFocus
        {...register('username')}
      />

      {error && <span className={styles.error}>{error}</span>}

      <div className={styles.usernameEditActions}>
        <Button className={styles.usernameCancelButton} onClick={cancel} disabled={isPending}>
          {t('common.cancel')}
        </Button>

        <Button className={styles.usernameSaveButton} onClick={save} disabled={isPending}>
          {t('common.save')}
        </Button>
      </div>
    </div>
  );
}
