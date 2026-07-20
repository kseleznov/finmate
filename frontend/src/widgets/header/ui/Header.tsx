'use client';

import { Logo } from '@/shared/ui/Logo';
import { useTranslation } from '@/entities/locale';
import { useHeader } from '../model/useHeader';
import styles from './Header.module.css';

export function Header() {
  const { spent, total, daysRemaining, percent, left, formatAmount } = useHeader();
  const { t } = useTranslation();

  return (
    <header className={styles.card}>
      <Logo className={styles.logo} />

      <div className={styles.budget}>
        {total === 0 ? (
          <div className={styles.hint}>{t('header.setIncomeHint')}</div>
        ) : (
          <>
            <div className={styles.amountRow}>
              <span className={styles.amount}>{formatAmount(spent)}</span>
              <span className={styles.total}>/ {formatAmount(total)}</span>
            </div>

            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${percent}%` }} />
            </div>

            <div className={styles.bottomRow}>
              <span className={styles.left}>
                {formatAmount(left)} {t('header.left')}
              </span>
              <span className={styles.separator}>·</span>
              <span className={styles.daysRemaining}>
                {t('header.daysRemaining', { days: daysRemaining })}
              </span>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
