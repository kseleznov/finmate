'use client';

import Link from 'next/link';
import { useAddOperation } from '../model/useAddOperation';
import { MethodStep } from './MethodStep';
import { FormStep } from './FormStep';
import { ChevronLeftIcon } from './ChevronLeftIcon';
import { CloseIcon } from './CloseIcon';
import styles from './AddOperation.module.css';

export function AddOperation() {
  const vm = useAddOperation();

  return (
    <>
      <div className={styles.header}>
        {vm.step === 'manual' ? (
          <button
            type="button"
            className={styles.backLink}
            onClick={vm.goToChoose}
            aria-label="Back"
          >
            <ChevronLeftIcon />
          </button>
        ) : (
          <Link href="/overview" className={styles.closeLink} aria-label="Close">
            <CloseIcon />
          </Link>
        )}
        <h1 className={styles.title}>Add operation</h1>
      </div>

      {vm.step === 'choose' ? (
        <MethodStep onManual={vm.goToManual} onScan={vm.goToManual} />
      ) : (
        <FormStep {...vm} />
      )}
    </>
  );
}
