'use client';

import { useSignUpForm } from '../model/useSignUpForm';
import styles from './AuthForm.module.css';

export function SignUpForm() {
  const { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit } =
    useSignUpForm();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="signup-email">
          Email
        </label>
        <input
          id="signup-email"
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
        <label className={styles.label} htmlFor="signup-password">
          Пароль
        </label>
        <input
          id="signup-password"
          type="password"
          className={styles.input}
          placeholder="Минимум 8 символов"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && <span className={styles.error}>{error}</span>}

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? 'Создаём аккаунт…' : 'Sign up'}
      </button>
    </form>
  );
}
