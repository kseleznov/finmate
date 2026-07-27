import { z } from 'zod';
import { usernameSchema } from '@/entities/user';

export function createUsernameFormSchema() {
  return z.object({ username: usernameSchema() });
}

export type UsernameFormValues = z.infer<ReturnType<typeof createUsernameFormSchema>>;
