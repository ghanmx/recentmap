import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTowing, UserDetails } from "@/utils/TowingContext";
import {useTowing} form "@/contex/TowingContext";
import { generateInvoiceNumber, createBillHTML } from "@/utils/billingUtils";
import { sendBillEmails } from "@/utils/emailService";
import { PaymentForm } from "./PaymentForm";

export interface PaymentWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSubmit?: (result: { success: boolean; error?: string }) => void;
  amount: number;
  userDetails: UserDetails;
}

const PaymentWindow: React.FC<PaymentWindowProps> = ({ 
  isOpen, 
  onClose, 
  onPaymentSubmit, 
  amount = 0,
  userDetails
}: PaymentWindowProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [cardComplete, setCardComplete] = React.useState(false);
  const { 
    totalDistance,
    detectedTolls,
    totalTollCost,
    truckType,
    requiresManeuver,
    pickupLocation,
    dropLocation,
  } = useTowing();

  React.useEffect(() => {
    if (isOpen) {
      setCardComplete(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isProcessing) {
      toast({
        title: "Pago en Proceso",
        description: "Por favor espere mientras procesamos su pago",
        variant: "destructive",
      });
      return;
    }
    onClose();
  };

  const generateBill = async (paymentMethod: string, paymentId: string) => {
    if (!userDetails || !pickupLocation || !dropLocation) {
      throw new Error("Missing required details for bill generation");
    }

    const invoiceNumber = generateInvoiceNumber();
    const services = [
      { description: "Servicio Base de Grúa", amount: amount - totalTollCost },
      ...(detectedTolls.map(toll => ({
        description: `Peaje - ${toll.name}`,
        amount: toll.cost
      }))),
      ...(requiresManeuver ? [{
        description: "Cargo por Maniobra Especial",
        amount: 0
      }] : [])
    ];

    const billDetails = {
      invoiceNumber,
      date: new Date(),
      userName: userDetails.name,
      userEmail: userDetails.email,
      phone: userDetails.phone,
      vehicleDetails: {
        make: userDetails.vehicleMake,
        model: userDetails.vehicleModel,
        year: userDetails.vehicleYear,
        color: userDetails.vehicleColor
      },
      locations: {
        pickup: {
          address: pickupLocation.address || "",
          coordinates: { lat: pickupLocation.lat, lng: pickupLocation.lng }
        },
        dropoff: {
          address: dropLocation.address || "",
          coordinates: { lat: dropLocation.lat, lng: dropLocation.lng }
        }
      },
      services,
      totalAmount: amount,
      paymentMethod,
      paymentId
    };

    const billHtml = createBillHTML(billDetails);
    await sendBillEmails(billDetails, billHtml);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!cardComplete) {
      toast({
        title: "Datos Incompletos",
        description: "Por favor complete todos los datos de la tarjeta",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    if (!stripe || !elements) {
      toast({
        title: "Error",
        description: "Sistema de pago no disponible. Intente más tarde.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast({
        title: "Error",
        description: "Elemento de tarjeta no encontrado.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw error;
      }

      await generateBill("Tarjeta de Crédito", paymentMethod.id);

      toast({
        title: "Pago Exitoso",
        description: "El pago ha sido procesado y la factura ha sido enviada.",
      });
      
      onPaymentSubmit?.({ success: true });
      onClose();
    } catch (err: any) {
      toast({
        title: "Error en el Pago",
        description: err.message || "Ocurrió un error durante el proceso de pago",
        variant: "destructive",
      });
      onPaymentSubmit?.({ success: false, error: err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-gray-50 border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <CreditCard className="w-5 h-5 text-primary" />
            Pago Seguro
          </DialogTitle>
        </DialogHeader>
        
        <PaymentForm
          amount={amount}
          isProcessing={isProcessing}
          cardComplete={cardComplete}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentWindow;
