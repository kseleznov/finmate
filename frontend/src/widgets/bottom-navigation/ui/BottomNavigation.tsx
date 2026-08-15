'use client';

import { Button } from '@/shared/ui/button/Button';
import { useBottomNavigation } from '../model/useBottomNavigation';
import clsx from 'clsx';
import styles from './BottomNavigation.module.css';

export function BottomNavigation() {
  const { active, firstItem, secondItem, thirdItem, fourthItem, addAria, addHref } =
    useBottomNavigation();

  return (
    <nav className={styles.bottomNav}>
      {[firstItem, secondItem].map(({ id, label, href, Icon }) => (
        <Button
          key={id}
          href={href}
          className={clsx(styles.navItem, active === id && styles.navItemActive)}
        >
          <Icon />
          <span>{label}</span>
        </Button>
      ))}

      <Button href={addHref} className={styles.plusButton} aria-label={addAria}>
        +
      </Button>

      {[thirdItem, fourthItem].map(({ id, label, href, Icon }) => (
        <Button
          key={id}
          href={href}
          className={clsx(styles.navItem, active === id && styles.navItemActive)}
        >
          <Icon />
          <span>{label}</span>
        </Button>
      ))}
    </nav>
  );
}
