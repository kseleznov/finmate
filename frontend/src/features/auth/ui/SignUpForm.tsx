'use client';

import { useMemo } from 'react';
import { useTranslation } from '@/entities/locale';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/Input';
import { register as registerUser } from '../api/auth';
import { createSignUpSchema } from '../model/schema';
import { useAuthForm } from '../model/useAuthForm';
import styles from './AuthForm.module.css';

export function SignUpForm() {
  const { t } = useTranslation();
  const signUpSchema = useMemo(() => createSignUpSchema(t), [t]);

  const { register, errors, isPending, onSubmit } = useAuthForm({
    schema: signUpSchema,
    defaultValues: { email: '', username: '', password: '' },
    mutationFn: registerUser,
    errorMessage: t('auth.signUpError'),
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="signup-email">
          {t('auth.email')}
        </label>
        <Input
          id="signup-email"
          type="email"
          className={styles.input}
          placeholder={t('auth.emailPlaceholder')}
          autoComplete="email"
          {...register('email')}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="signup-username">
          {t('auth.username')}
        </label>
        <Input
          id="signup-username"
          type="text"
          className={styles.input}
          placeholder={t('auth.usernamePlaceholder')}
          autoComplete="username"
          {...register('username')}
        />
        {errors.username && <span className={styles.error}>{errors.username.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="signup-password">
          {t('auth.password')}
        </label>
        <Input
          id="signup-password"
          type="password"
          className={styles.input}
          placeholder={t('auth.passwordPlaceholderSignUp')}
          autoComplete="new-password"
          {...register('password')}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>

      {errors.root && <span className={styles.error}>{errors.root.message}</span>}

      <Button type="submit" className={styles.submitButton} disabled={isPending}>
        {isPending ? t('auth.signUpLoading') : t('auth.signUp')}
      </Button>
    </form>
  );
}
