import { PencilIcon } from './PencilIcon';
import { CameraIcon } from './CameraIcon';
import styles from './MethodStep.module.css';

interface Props {
  onManual: () => void;
  onScan: () => void;
}

export function MethodStep({ onManual, onScan }: Props) {
  return (
    <div className={styles.step}>
      <button type="button" className={styles.card} onClick={onManual}>
        <span className={styles.iconCircle}>
          <PencilIcon />
        </span>
        <span className={styles.cardTitle}>Enter manually</span>
        <span className={styles.cardSubtitle}>AI will help pick a category</span>
      </button>

      <button type="button" className={`${styles.card} ${styles.cardScan}`} onClick={onScan}>
        <span className={styles.iconCircle}>
          <CameraIcon />
        </span>
        <span className={styles.cardTitle}>Scan receipt</span>
        <span className={styles.cardSubtitle}>Automatic item recognition</span>
      </button>
    </div>
  );
}
