import { towTruckTypes } from "./towTruckPricing";
import { calculateTotalCost, formatCurrency } from "./priceCalculator";

interface InvoiceItem {
  description: string;
  amount: number;
}

interface InvoiceData {
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export const generateInvoice = (data: {
  distance: number;
  truckType: string;
  requiresManeuver: boolean;
  tollCosts: number;
  requiresInvoice: boolean;
}): InvoiceData => {
  const total = calculateTotalCost(
    data.distance,
    data.truckType,
    data.requiresManeuver,
    data.tollCosts,
    data.requiresInvoice
  );

  const truck = towTruckTypes[data.truckType];
  const baseCost = data.distance * truck.perKm;
  const maneuverCost = data.requiresManeuver ? truck.maneuverCharge : 0;
  const subtotal = baseCost + maneuverCost + data.tollCosts;
  const tax = data.requiresInvoice ? subtotal * 0.16 : 0;

  const invoiceData: InvoiceData = {
    date: new Date().toLocaleDateString(),
    items: [
      {
        description: `Servicio de grúa (${data.distance.toFixed(2)} km)`,
        amount: baseCost
      },
      {
        description: 'Casetas de peaje',
        amount: data.tollCosts
      }
    ],
    subtotal,
    tax,
    total
  };

  if (data.requiresManeuver) {
    invoiceData.items.push({
      description: 'Cargo por maniobra',
      amount: maneuverCost
    });
  }

  return invoiceData;
};

export const downloadInvoice = (invoiceData: InvoiceData): void => {
  const invoiceContent = `
FACTURA

Fecha: ${invoiceData.date}

DESGLOSE:
${invoiceData.items.map(item => 
  `${item.description}: ${formatCurrency(item.amount)}`
).join('\n')}

Subtotal: ${formatCurrency(invoiceData.subtotal)}
IVA (16%): ${formatCurrency(invoiceData.tax)}
Total: ${formatCurrency(invoiceData.total)}
  `;

  const blob = new Blob([invoiceContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `factura_${new Date().getTime()}.txt`;
  a.click();
  window.URL.revokeObjectURL(url);
};