'use client';

import { useTranslation } from '@/entities/locale';
import { useSignUpForm } from '../model/useSignUpForm';
import styles from './AuthForm.module.css';

export function SignUpForm() {
  const { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit } =
    useSignUpForm();
  const { t } = useTranslation();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="signup-email">
          {t('auth.email')}
        </label>
        <input
          id="signup-email"
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
        <label className={styles.label} htmlFor="signup-password">
          {t('auth.password')}
        </label>
        <input
          id="signup-password"
          type="password"
          className={styles.input}
          placeholder={t('auth.passwordPlaceholderSignUp')}
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && <span className={styles.error}>{error}</span>}

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? t('auth.signUpLoading') : t('auth.signUp')}
      </button>
    </form>
  );
}
