import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import { Download, CreditCard } from 'lucide-react'
import styles from './VehicleFormActions.module.css'

interface VehicleFormActionsProps {
  onDownload: (format: 'csv' | 'txt') => Promise<void>
  onCopy: () => void
  onSubmit: () => void
  isPending: boolean
  formData: string
}

export const VehicleFormActions = ({
  onDownload,
  onCopy,
  onSubmit,
  isPending,
  formData,
}: VehicleFormActionsProps) => {
  return (
    <div className={styles.container}>
      <Button
        type="button"
        variant="outline"
        onClick={() => onDownload('csv')}
        className={styles.csvButton}
      >
        <Download className={styles.icon} />
        CSV
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => onDownload('txt')}
        className={styles.txtButton}
      >
        <Download className={styles.icon} />
        TXT
      </Button>
      <CopyButton
        text={formData}
        onCopy={onCopy}
        className={styles.copyButton}
      />
      <Button
        type="submit"
        disabled={isPending}
        onClick={onSubmit}
        className={styles.submitButton}
      >
        {isPending ? (
          <span className={styles.loadingContainer}>
            <div className={styles.spinner} />
            Procesando...
          </span>
        ) : (
          <span className={styles.buttonContent}>
            <CreditCard className={styles.icon} />
            Continuar al Pago
          </span>
        )}
      </Button>
    </div>
  )
}
