import { useState } from 'react';

export function useDonut() {
  const data = [
    { name: 'Shopping', value: 57, color: '#e91e8c', icon: '🛍️' },
    { name: 'Utilities', value: 21, color: '#4b5563', icon: '⚡' },
    { name: 'Groceries', value: 12, color: '#12b76a', icon: '🛒' },
    { name: 'Transport', value: 5, color: '#3b82f6', icon: '🚗' },
    { name: 'Food', value: 5, color: '#f59e0b', icon: '☕' },
  ];

  const totalAmount = 28200;

  const RADIAN = Math.PI / 180;

  const formatAmount = (amount: number) => new Intl.NumberFormat('ru-RU').format(amount) + ' €';

  const hexToRgba = (hex: string, alpha: number) => {
    const value = parseInt(hex.replace('#', ''), 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (dataItem: any, index: number) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  const centerLabel = selected === null ? 'Spent' : data[selected].name;
  const centerAmount =
    selected === null ? totalAmount : Math.round((totalAmount * data[selected].value) / 100);
  const centerSub = selected === null ? '' : `${data[selected].value}% of expenses`;

  return {
    data,
    totalAmount,
    RADIAN,
    formatAmount,
    hexToRgba,
    selected,
    handleClick,
    centerLabel,
    centerAmount,
    centerSub,
  };
}
