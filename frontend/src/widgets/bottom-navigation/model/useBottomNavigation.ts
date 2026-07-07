import { usePathname } from 'next/navigation';
import { BudgetIcon } from '../ui/BudgetIcon';
import { OperationsIcon } from '../ui/OperationsIcon';
import { OverviewIcon } from '../ui/OverviewIcon';
import { ProfileIcon } from '../ui/ProfileIcon';

export function useBottomNavigation() {
  const items = [
    { id: 'overview', label: 'Обзор', href: '/', Icon: OverviewIcon },
    { id: 'operations', label: 'Operations', href: '/operations', Icon: OperationsIcon },
    { id: 'budget', label: 'Бюджет', href: '/budget', Icon: BudgetIcon },
    { id: 'profile', label: 'Профиль', href: '/profile', Icon: ProfileIcon },
  ] as const;

  const pathname = usePathname();
  const active = items.find((item) => item.href === pathname)?.id ?? 'overview';
  const [firstItem, secondItem, thirdItem, fourthItem] = items;

  return { active, firstItem, secondItem, thirdItem, fourthItem };
}
