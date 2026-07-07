import { useLegend } from '../model/useLegend';
import styles from './Legend.module.css';

export function Legend() {
  const { items } = useLegend();

  return (
    <div className={styles.legend}>
      {items.map((it) => (
        <div key={it.label} className={styles.legendItem}>
          <span className={styles[`legColor_${it.color}`]} />
          <span>{it.label}</span>
          <span className={styles.legPercent}>{it.pct}</span>
        </div>
      ))}
    </div>
  );
}
