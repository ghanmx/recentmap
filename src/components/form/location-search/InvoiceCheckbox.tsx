interface InvoiceCheckboxProps {
  type: 'pickup' | 'drop'
  requiresInvoice: boolean
  onInvoiceChange: (checked: boolean) => void
}

export const InvoiceCheckbox = ({
  type,
  requiresInvoice,
  onInvoiceChange,
}: InvoiceCheckboxProps) => {
  return (
    <div className="flex items-center gap-2 mt-2">
      <input
        type="checkbox"
        id={`requires-invoice-${type}`}
        checked={requiresInvoice}
        onChange={(e) => onInvoiceChange(e.target.checked)}
        className="rounded border-gray-300 text-primary focus:ring-primary"
      />
      <label
        htmlFor={`requires-invoice-${type}`}
        className="text-sm text-gray-600"
      >
        Requiere factura (IVA)
      </label>
    </div>
  )
}