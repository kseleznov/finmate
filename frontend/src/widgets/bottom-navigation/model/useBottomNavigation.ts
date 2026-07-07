import { usePathname } from 'next/navigation';
import { useTranslation } from '@/entities/locale';
import { useAuth } from '@/entities/user';
import { BudgetIcon } from '../ui/BudgetIcon';
import { OperationsIcon } from '../ui/OperationsIcon';
import { OverviewIcon } from '../ui/OverviewIcon';
import { ProfileIcon } from '../ui/ProfileIcon';

export function useBottomNavigation() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  const items = [
    { id: 'overview', label: t('nav.overview'), href: '/overview', Icon: OverviewIcon },
    { id: 'operations', label: t('nav.operations'), href: '/operations', Icon: OperationsIcon },
    { id: 'budget', label: t('nav.budget'), href: '/budget', Icon: BudgetIcon },
    { id: 'profile', label: t('nav.profile'), href: '/profile', Icon: ProfileIcon },
  ] as const;

  const pathname = usePathname();
  const active = items.find((item) => item.href === pathname)?.id ?? 'overview';
  const [firstItem, secondItem, thirdItem, fourthItem] = items;
  const addAria = t('nav.addAria');
  const addHref = isAuthenticated ? '/add' : '/profile';

  return { active, firstItem, secondItem, thirdItem, fourthItem, addAria, addHref };
}
