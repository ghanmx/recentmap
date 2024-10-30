import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Check, MapPin, Truck, CreditCard } from "lucide-react";

interface BookingProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export const BookingProgress = ({ currentStep, totalSteps = 4 }: BookingProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { icon: MapPin, label: "Location" },
    { icon: Truck, label: "Vehicle" },
    { icon: Check, label: "Service" },
    { icon: CreditCard, label: "Payment" },
  ];

  return (
    <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200/50">
      <Progress value={progress} className="mb-4" />
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <div 
              key={step.label}
              className={`flex flex-col items-center gap-2 ${
                isCompleted ? 'text-primary' : isActive ? 'text-secondary' : 'text-gray-400'
              }`}
            >
              <div className={`p-2 rounded-full ${
                isCompleted ? 'bg-primary/10' : isActive ? 'bg-secondary/10' : 'bg-gray-100'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">{step.label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};