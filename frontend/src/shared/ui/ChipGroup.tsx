'use client';

import clsx from 'clsx';
import { Button } from '@/shared/ui/button';
import styles from './ChipGroup.module.css';

interface ChipGroupItem<T extends string> {
  value: T;
  label: string;
}

interface ChipGroupProps<T extends string> {
  items: ChipGroupItem<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function ChipGroup<T extends string>({ items, value, onChange }: ChipGroupProps<T>) {
  return (
    <div className={styles.group}>
      {items.map((item) => (
        <Button
          key={item.value}
          className={clsx(styles.chip, value === item.value && styles.chipActive)}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
