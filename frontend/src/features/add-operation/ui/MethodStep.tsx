import { useTranslation } from '@/entities/locale';
import { PencilIcon } from './PencilIcon';
import { CameraIcon } from './CameraIcon';
import styles from './MethodStep.module.css';

interface Props {
  onManual: () => void;
  onScan: () => void;
}

export function MethodStep({ onManual, onScan }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.step}>
      <button type="button" className={styles.card} onClick={onManual}>
        <span className={styles.iconCircle}>
          <PencilIcon />
        </span>
        <span className={styles.cardTitle}>{t('addOperation.enterManually')}</span>
        <span className={styles.cardSubtitle}>{t('addOperation.aiHelp')}</span>
      </button>

      <button type="button" className={`${styles.card} ${styles.cardScan}`} onClick={onScan}>
        <span className={styles.iconCircle}>
          <CameraIcon />
        </span>
        <span className={styles.cardTitle}>{t('addOperation.scanReceipt')}</span>
        <span className={styles.cardSubtitle}>{t('addOperation.autoRecognition')}</span>
      </button>
    </div>
  );
}
