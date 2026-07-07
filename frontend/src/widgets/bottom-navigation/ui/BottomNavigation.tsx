'use client';

import Link from 'next/link';
import { useBottomNavigation } from '../model/useBottomNavigation';
import styles from './BottomNavigation.module.css';

export function BottomNavigation() {
  const { active, firstItem, secondItem, thirdItem, fourthItem, addAria } = useBottomNavigation();

  return (
    <nav className={styles.bottomNav}>
      {[firstItem, secondItem].map(({ id, label, href, Icon }) => (
        <Link
          key={id}
          href={href}
          className={`${styles.navItem} ${active === id ? styles.navItemActive : ''}`}
        >
          <Icon />
          <span>{label}</span>
        </Link>
      ))}

      <Link href="/add" className={styles.plusButton} aria-label={addAria}>
        +
      </Link>

      {[thirdItem, fourthItem].map(({ id, label, href, Icon }) => (
        <Link
          key={id}
          href={href}
          className={`${styles.navItem} ${active === id ? styles.navItemActive : ''}`}
        >
          <Icon />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
