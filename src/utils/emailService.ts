import { BillDetails } from './billingUtils'

// This is a mock email service - replace with your actual email service implementation
export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
): Promise<boolean> => {
  console.log(`Email would be sent to ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(`Content: ${html}`)

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return true
}

export const sendBillEmails = async (
  billDetails: BillDetails,
  billHtml: string,
): Promise<void> => {
  const adminEmail = 'admin@example.com' // Replace with actual admin email

  // Send to user
  await sendEmail(
    billDetails.userEmail,
    `Confirmación de Servicio de Grúa - ${billDetails.invoiceNumber}`,
    billHtml,
  )

  // Send to admin
  await sendEmail(
    adminEmail,
    `Nueva Solicitud de Servicio - ${billDetails.invoiceNumber}`,
    billHtml,
  )
}
