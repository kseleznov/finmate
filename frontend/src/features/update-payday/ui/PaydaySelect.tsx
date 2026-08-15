'use client';

import { useTranslation } from '@/entities/locale';
import { Select } from '@/shared/ui/Select';
import { useUpdatePayday } from '../model/useUpdatePayday';
import styles from './PaydaySelect.module.css';

export function PaydaySelect() {
  const { t } = useTranslation();
  const { payday, isPending, handleChange } = useUpdatePayday();

  return (
    <Select
      className={styles.paydaySelect}
      value={payday}
      onChange={handleChange}
      disabled={isPending}
    >
      <option value="" disabled>
        {t('profile.paydayNotSet')}
      </option>
      {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </Select>
  );
}
