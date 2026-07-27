'use client';

import { useMemo } from 'react';
import { useTranslation } from '@/entities/locale';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/Input';
import { login } from '../api/auth';
import { createSignInSchema } from '../model/schema';
import { useAuthForm } from '../model/useAuthForm';
import styles from './AuthForm.module.css';

export function SignInForm() {
  const { t } = useTranslation();
  const signInSchema = useMemo(() => createSignInSchema(t), [t]);

  const { register, errors, isPending, onSubmit } = useAuthForm({
    schema: signInSchema,
    defaultValues: { email: '', password: '' },
    mutationFn: login,
    errorMessage: t('auth.signInError'),
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="signin-email">
          {t('auth.email')}
        </label>
        <Input
          id="signin-email"
          type="email"
          className={styles.input}
          placeholder={t('auth.emailPlaceholder')}
          autoComplete="email"
          {...register('email')}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="signin-password">
          {t('auth.password')}
        </label>
        <Input
          id="signin-password"
          type="password"
          className={styles.input}
          placeholder={t('auth.passwordPlaceholderSignIn')}
          autoComplete="current-password"
          {...register('password')}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>

      {errors.root && <span className={styles.error}>{errors.root.message}</span>}

      <Button type="submit" className={styles.submitButton} disabled={isPending}>
        {isPending ? t('auth.signInLoading') : t('auth.signIn')}
      </Button>
    </form>
  );
}
