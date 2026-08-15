import { apiFetch } from '@/shared/api/client';
import type { OperationDto } from '../model/types';

export function getOperations() {
  return apiFetch<OperationDto[]>('/operations');
}
