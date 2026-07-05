'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './Donut.module.css';
import { useDonut } from '../model/useDonut';
import { renderCalloutLabel } from '../model/renderCalloutLabel';

export function Donut() {
  const {
    data,
    RADIAN,
    formatAmount,
    hexToRgba,
    selected,
    handleClick,
    centerLabel,
    centerAmount,
    centerSub,
  } = useDonut();

  return (
    <div className={styles.container}>
      <div className={styles.donutWrapper}>
        <div className={styles.chartContainer}>
          <div className={styles.chartSurface}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  label={(props) =>
                    renderCalloutLabel({
                      props,
                      data,
                      RADIAN,
                      hexToRgba,
                      selected,
                      handleClick,
                      styles,
                    })
                  }
                  labelLine={false}
                  cornerRadius={8}
                  isAnimationActive={false}
                  onClick={handleClick}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={selected === null || selected === index ? 1 : 0.25}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.centerText}>
            <div
              className={`${styles.centerLabel} ${selected !== null ? styles.centerLabelActive : ''}`}
            >
              {centerLabel}
            </div>
            <div className={styles.centerAmount}>{formatAmount(centerAmount)}</div>
            {centerSub && <div className={styles.centerSubLabel}>{centerSub}</div>}
          </div>
        </div>
      </div>

      <div className={styles.hintText}>
        {selected === null ? 'Click on a segment to see details' : 'Click again to return to total'}
      </div>
    </div>
  );
}
