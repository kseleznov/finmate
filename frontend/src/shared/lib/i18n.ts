export type LocaleCode = 'ru' | 'en';

export const LOCALES: { code: LocaleCode; label: string }[] = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

const LOCALE_KEY = 'finmate_locale';
export const DEFAULT_LOCALE: LocaleCode = 'ru';

export function getStoredLocale(): LocaleCode {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const stored = localStorage.getItem(LOCALE_KEY);
  return LOCALES.some((item) => item.code === stored) ? (stored as LocaleCode) : DEFAULT_LOCALE;
}

export function setStoredLocale(locale: LocaleCode) {
  localStorage.setItem(LOCALE_KEY, locale);
}

export function getIntlLocale(locale: LocaleCode) {
  return locale === 'ru' ? 'ru-RU' : 'en-GB';
}

type Dictionary = typeof ru;

const ru = {
  common: {
    genericError: 'Что-то пошло не так',
  },
  nav: {
    overview: 'Обзор',
    operations: 'Операции',
    budget: 'Бюджет',
    profile: 'Профиль',
    addAria: 'Добавить операцию',
  },
  pages: {
    budget: 'Бюджет на месяц',
    operations: 'Операции',
    profile: 'Профиль',
  },
  auth: {
    signIn: 'Войти',
    signUp: 'Регистрация',
    email: 'Email',
    password: 'Пароль',
    emailPlaceholder: 'you@example.com',
    passwordPlaceholderSignIn: '••••••••',
    passwordPlaceholderSignUp: 'Минимум 8 символов',
    signInLoading: 'Входим…',
    signUpLoading: 'Создаём аккаунт…',
    signInError: 'Не удалось войти',
    signUpError: 'Не удалось зарегистрироваться',
    passwordTooShort: 'Пароль должен быть не короче {min} символов',
  },
  profile: {
    currency: 'Валюта',
    language: 'Язык',
    logout: 'Выйти',
  },
  addOperation: {
    title: 'Добавить операцию',
    back: 'Назад',
    close: 'Закрыть',
    enterManually: 'Ввести вручную',
    aiHelp: 'ИИ поможет выбрать категорию',
    scanReceipt: 'Сканировать чек',
    autoRecognition: 'Автоматическое распознавание позиций',
    amountLabel: 'Сумма ({symbol})',
    increaseAmount: 'Увеличить сумму',
    decreaseAmount: 'Уменьшить сумму',
    whatDidYouBuy: 'Что вы купили?',
    titlePlaceholder: 'например, кофе в Starbucks',
    category: 'Категория',
    saving: 'Сохраняем…',
    submit: 'Добавить операцию',
    errorEnterTitle: 'Укажите, что вы купили',
    errorEnterAmount: 'Введите сумму больше 0',
    errorSubmit: 'Не удалось сохранить операцию',
  },
  budget: {
    expectedIncome: 'Ожидаемый доход',
    editIncome: 'Изменить ожидаемый доход',
    allocated: 'Распределено',
    leftToAllocate: 'Осталось распределить',
    categoryLimits: 'Лимиты по категориям',
    editLimit: 'Изменить лимит «{title}»',
  },
  categories: {
    title: 'Категории',
    remaining: 'Осталось {amount}',
    collapse: 'Свернуть',
    showAll: 'Показать все',
  },
  donut: {
    noExpenses: 'Пока нет расходов',
    clickSegment: 'Нажмите на сегмент, чтобы увидеть детали',
    clickAgain: 'Нажмите ещё раз, чтобы вернуться к итогу',
    spent: 'Потрачено',
    percentOfExpenses: '{value}% от расходов',
  },
  header: {
    left: 'осталось',
    daysRemaining: 'дней осталось: {days}',
  },
  operations: {
    emptyTitle: 'Пока нет операций',
    emptySubtitle: 'Ваши расходы появятся здесь после первой добавленной операции',
    today: 'Сегодня',
    yesterday: 'Вчера',
  },
  welcome: {
    tagline: 'Ваши финансы под контролем',
    description:
      'Учитывайте расходы, планируйте бюджет по категориям и следите за тратами — всё в одном приложении.',
  },
};

const en: Dictionary = {
  common: {
    genericError: 'Something went wrong',
  },
  nav: {
    overview: 'Overview',
    operations: 'Operations',
    budget: 'Budget',
    profile: 'Profile',
    addAria: 'Add operation',
  },
  pages: {
    budget: 'Monthly budget',
    operations: 'Operations',
    profile: 'Profile',
  },
  auth: {
    signIn: 'Sign in',
    signUp: 'Sign up',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'you@example.com',
    passwordPlaceholderSignIn: '••••••••',
    passwordPlaceholderSignUp: 'Minimum 8 characters',
    signInLoading: 'Signing in…',
    signUpLoading: 'Creating account…',
    signInError: 'Could not sign in',
    signUpError: 'Could not sign up',
    passwordTooShort: 'Password must be at least {min} characters',
  },
  profile: {
    currency: 'Currency',
    language: 'Language',
    logout: 'Log out',
  },
  addOperation: {
    title: 'Add operation',
    back: 'Back',
    close: 'Close',
    enterManually: 'Enter manually',
    aiHelp: 'AI will help pick a category',
    scanReceipt: 'Scan receipt',
    autoRecognition: 'Automatic item recognition',
    amountLabel: 'Amount ({symbol})',
    increaseAmount: 'Increase amount',
    decreaseAmount: 'Decrease amount',
    whatDidYouBuy: 'What did you buy?',
    titlePlaceholder: 'e.g. Coffee at Starbucks',
    category: 'Category',
    saving: 'Saving…',
    submit: 'Add operation',
    errorEnterTitle: 'Enter what you bought',
    errorEnterAmount: 'Enter an amount greater than 0',
    errorSubmit: 'Could not save the operation',
  },
  budget: {
    expectedIncome: 'Expected income',
    editIncome: 'Edit expected income',
    allocated: 'Allocated',
    leftToAllocate: 'Left to allocate',
    categoryLimits: 'Category limits',
    editLimit: 'Edit {title} limit',
  },
  categories: {
    title: 'Categories',
    remaining: 'Remaining {amount}',
    collapse: 'Collapse',
    showAll: 'Show all',
  },
  donut: {
    noExpenses: 'No expenses yet',
    clickSegment: 'Click on a segment to see details',
    clickAgain: 'Click again to return to total',
    spent: 'Spent',
    percentOfExpenses: '{value}% of expenses',
  },
  header: {
    left: 'left',
    daysRemaining: '{days} days remaining',
  },
  operations: {
    emptyTitle: 'No transactions yet',
    emptySubtitle: 'Your expenses will show up here once you add one',
    today: 'Today',
    yesterday: 'Yesterday',
  },
  welcome: {
    tagline: 'Your finances, under control',
    description:
      'Track expenses, plan your budget by category, and keep an eye on your spending — all in one app.',
  },
};

const dictionaries: Record<LocaleCode, Dictionary> = { ru, en };

export type TranslationKey = string;

export function translate(
  locale: LocaleCode,
  key: TranslationKey,
  vars?: Record<string, string | number>
) {
  const parts = key.split('.');
  let value: unknown = dictionaries[locale];

  for (const part of parts) {
    value = (value as Record<string, unknown> | undefined)?.[part];
  }

  if (typeof value !== 'string') return key;
  if (!vars) return value;

  return value.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ''));
}
