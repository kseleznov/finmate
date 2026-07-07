interface Props {
  props: any;
  data: any[];
  RADIAN: number;
  hexToRgba: (color: string, alpha: number) => string;
  selected: number | null;
  handleClick: (dataItem: any, index: number) => void;
  styles: { [key: string]: string };
}

export function renderCalloutLabel({
  props,
  data,
  RADIAN,
  hexToRgba,
  selected,
  handleClick,
  styles,
}: Props) {
  const { cx, cy, midAngle, outerRadius, index } = props;
  const entry = data[index];
  const radius = outerRadius + 38;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const isHidden = selected !== null && selected !== index;

  return (
    <foreignObject
      key={`label-${index}`}
      x={x - 60}
      y={y - 22}
      width={120}
      height={44}
      style={{ overflow: 'visible', pointerEvents: 'none' }}
    >
      <div className={styles.calloutWrapper}>
        <div
          className={`${styles.callout} ${isHidden ? styles.calloutHidden : ''}`}
          style={{ pointerEvents: isHidden ? 'none' : 'auto' }}
          onClick={() => handleClick(entry, index)}
        >
          <div className={styles.calloutIcon} style={{ background: hexToRgba(entry.color, 0.14) }}>
            {entry.icon}
          </div>
          <div className={styles.calloutText}>
            <span className={styles.calloutTitle}>{entry.name}</span>
            <span className={styles.calloutPercent} style={{ color: entry.color }}>
              {entry.value}%
            </span>
          </div>
        </div>
      </div>
    </foreignObject>
  );
}
