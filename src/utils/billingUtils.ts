import { formatCurrency } from './priceCalculator'

export interface BillDetails {
  invoiceNumber: string
  date: Date
  userName: string
  userEmail: string
  phone: string
  vehicleDetails: {
    make: string
    model: string
    year: string
    color: string
  }
  locations: {
    pickup: {
      address: string
      coordinates: { lat: number; lng: number }
    }
    dropoff: {
      address: string
      coordinates: { lat: number; lng: number }
    }
  }
  services: {
    description: string
    amount: number
  }[]
  totalAmount: number
  paymentMethod: string
  paymentId: string
}

export const generateInvoiceNumber = () => {
  const date = new Date()
  const random = Math.floor(Math.random() * 10000)
  return `INV-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${random}`
}

export const createBillHTML = (details: BillDetails): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .header { text-align: center; margin-bottom: 30px; }
        .invoice-details { margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; }
        .total { font-weight: bold; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Factura de Servicio de Grúa</h1>
        <p>Número de Factura: ${details.invoiceNumber}</p>
        <p>Fecha: ${details.date.toLocaleDateString()}</p>
      </div>

      <div class="invoice-details">
        <h3>Detalles del Cliente</h3>
        <p>Nombre: ${details.userName}</p>
        <p>Email: ${details.userEmail}</p>
        <p>Teléfono: ${details.phone}</p>

        <h3>Detalles del Vehículo</h3>
        <p>Marca: ${details.vehicleDetails.make}</p>
        <p>Modelo: ${details.vehicleDetails.model}</p>
        <p>Año: ${details.vehicleDetails.year}</p>
        <p>Color: ${details.vehicleDetails.color}</p>

        <h3>Ubicaciones</h3>
        <p>Punto de Recogida: ${details.locations.pickup.address}</p>
        <p>Coordenadas: ${details.locations.pickup.coordinates.lat}, ${details.locations.pickup.coordinates.lng}</p>
        <p>Punto de Entrega: ${details.locations.dropoff.address}</p>
        <p>Coordenadas: ${details.locations.dropoff.coordinates.lat}, ${details.locations.dropoff.coordinates.lng}</p>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          ${details.services
            .map(
              (service) => `
            <tr>
              <td>${service.description}</td>
              <td>${formatCurrency(service.amount)}</td>
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>

      <div class="total">
        <p>Total: ${formatCurrency(details.totalAmount)}</p>
      </div>

      <div class="payment-info">
        <p>Método de Pago: ${details.paymentMethod}</p>
        <p>ID de Transacción: ${details.paymentId}</p>
      </div>

      <footer>
        <p>Este documento sirve como comprobante de pago y solicitud del servicio.</p>
        <p>La grúa ha sido asignada y está en camino.</p>
      </footer>
    </body>
    </html>
  `
}
