import { usePathname } from 'next/navigation';
import { BudgetIcon } from '../ui/BudgetIcon';
import { OperationsIcon } from '../ui/OperationsIcon';
import { OverviewIcon } from '../ui/OverviewIcon';

export function useBottomNavigation() {
  const items = [
    { id: 'overview', label: 'Обзор', href: '/', Icon: OverviewIcon },
    { id: 'operations', label: 'Операции', href: '/operations', Icon: OperationsIcon },
    { id: 'budget', label: 'Бюджет', href: '/budget', Icon: BudgetIcon },
  ] as const;

  const pathname = usePathname();
  const active = items.find((item) => item.href === pathname)?.id ?? 'overview';
  const [firstItem, secondItem, thirdItem] = items;

  return { active, firstItem, secondItem, thirdItem };
}
