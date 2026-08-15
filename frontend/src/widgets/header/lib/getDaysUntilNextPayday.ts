export function getDaysUntilNextPayday(payday: number) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = new Date(year, month, now.getDate());

  function clampedPaydayDate(y: number, m: number) {
    const lastDay = new Date(y, m + 1, 0).getDate();
    return new Date(y, m, Math.min(payday, lastDay));
  }

  let target = clampedPaydayDate(year, month);
  if (target < today) {
    target = clampedPaydayDate(year, month + 1);
  }

  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((target.getTime() - today.getTime()) / msPerDay);
}
