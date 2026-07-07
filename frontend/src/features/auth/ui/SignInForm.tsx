'use client';

import { useTranslation } from '@/entities/locale';
import { useSignInForm } from '../model/useSignInForm';
import styles from './AuthForm.module.css';

export function SignInForm() {
  const { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit } =
    useSignInForm();
  const { t } = useTranslation();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="signin-email">
          {t('auth.email')}
        </label>
        <input
          id="signin-email"
          type="email"
          className={styles.input}
          placeholder={t('auth.emailPlaceholder')}
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="signin-password">
          {t('auth.password')}
        </label>
        <input
          id="signin-password"
          type="password"
          className={styles.input}
          placeholder={t('auth.passwordPlaceholderSignIn')}
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && <span className={styles.error}>{error}</span>}

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? t('auth.signInLoading') : t('auth.signIn')}
      </button>
    </form>
  );
}
