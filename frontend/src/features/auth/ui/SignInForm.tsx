'use client';

import { useSignInForm } from '../model/useSignInForm';
import styles from './AuthForm.module.css';

export function SignInForm() {
  const { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit } =
    useSignInForm();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="signin-email">
          Email
        </label>
        <input
          id="signin-email"
          type="email"
          className={styles.input}
          placeholder="you@example.com"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="signin-password">
          Пароль
        </label>
        <input
          id="signin-password"
          type="password"
          className={styles.input}
          placeholder="••••••••"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && <span className={styles.error}>{error}</span>}

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? 'Входим…' : 'Sign in'}
      </button>
    </form>
  );
}
