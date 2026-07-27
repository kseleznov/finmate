import { create } from 'zustand';
import { getStoredLocale, setStoredLocale, DEFAULT_LOCALE } from '@/shared/lib/i18n';
import type { LocaleCode } from '@/shared/lib/i18n';

interface LocaleState {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: DEFAULT_LOCALE,
  setLocale: (locale) => {
    setStoredLocale(locale);
    set({ locale });
  },
}));

export function hydrateLocaleStore() {
  useLocaleStore.setState({ locale: getStoredLocale() });
}
