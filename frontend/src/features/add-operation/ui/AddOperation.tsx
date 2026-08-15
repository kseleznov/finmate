'use client';

import { useTranslation } from '@/entities/locale';
import { Button } from '@/shared/ui/button';
import { useAddOperation } from '../model/useAddOperation';
import { MethodStep } from './MethodStep';
import { FormStep } from './FormStep';
import { ChevronLeftIcon, CloseIcon } from './icons';
import styles from './AddOperation.module.css';

export function AddOperation() {
  const vm = useAddOperation();
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.header}>
        {vm.step === 'manual' ? (
          <Button
            className={styles.backLink}
            onClick={vm.goToChoose}
            aria-label={t('addOperation.back')}
          >
            <ChevronLeftIcon />
          </Button>
        ) : (
          <Button
            href="/overview"
            className={styles.closeLink}
            aria-label={t('addOperation.close')}
          >
            <CloseIcon />
          </Button>
        )}
        <h1 className={styles.title}>{t('addOperation.title')}</h1>
      </div>

      {vm.step === 'choose' ? (
        <MethodStep onManual={vm.goToManual} onScan={vm.goToManual} />
      ) : (
        <FormStep {...vm} />
      )}
    </>
  );
}
