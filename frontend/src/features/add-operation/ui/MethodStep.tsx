import clsx from 'clsx';
import { useTranslation } from '@/entities/locale';
import { Button } from '@/shared/ui/button';
import { PencilIcon, CameraIcon } from './icons';
import styles from './MethodStep.module.css';

interface Props {
  onManual: () => void;
  onScan: () => void;
}

export function MethodStep({ onManual, onScan }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.step}>
      <Button className={styles.card} onClick={onManual}>
        <span className={styles.iconCircle}>
          <PencilIcon />
        </span>
        <span className={styles.cardTitle}>{t('addOperation.enterManually')}</span>
        <span className={styles.cardSubtitle}>{t('addOperation.aiHelp')}</span>
      </Button>

      <Button className={clsx(styles.card, styles.cardScan)} onClick={onScan}>
        <span className={styles.iconCircle}>
          <CameraIcon />
        </span>
        <span className={styles.cardTitle}>{t('addOperation.scanReceipt')}</span>
        <span className={styles.cardSubtitle}>{t('addOperation.autoRecognition')}</span>
      </Button>
    </div>
  );
}
