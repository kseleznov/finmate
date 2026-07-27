'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useDonut } from '../model/useDonut';
import { renderCalloutLabel } from '../model/renderCalloutLabel';
import { hexToRgba } from '../lib/hexToRgba';
import styles from './Donut.module.css';

export function Donut() {
  const {
    pieData,
    isEmpty,
    RADIAN,
    selected,
    centerSub,
    centerLabel,
    centerAmount,
    handleClick,
    formatAmount,
  } = useDonut();

  return (
    <div className={styles.container}>
      <div className={styles.donutWrapper}>
        <div className={styles.chartContainer}>
          <div className={styles.chartSurface}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={isEmpty ? 0 : 2}
                  dataKey="value"
                  label={
                    isEmpty
                      ? undefined
                      : (props) =>
                          renderCalloutLabel({
                            props,
                            data: pieData,
                            RADIAN,
                            hexToRgba,
                            selected,
                            handleClick,
                            styles,
                          })
                  }
                  labelLine={false}
                  cornerRadius={isEmpty ? 0 : 8}
                  isAnimationActive={false}
                  onClick={isEmpty ? undefined : handleClick}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={isEmpty ? 'none' : undefined}
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
    </div>
  );
}
