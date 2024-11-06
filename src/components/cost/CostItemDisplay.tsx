import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/priceCalculator";

interface CostItemDisplayProps {
  label: string;
  amount: number;
  icon?: React.ReactNode;
  indent?: boolean;
}

export const CostItemDisplay = ({
  label,
  amount,
  icon,
  indent = false,
}: CostItemDisplayProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`flex justify-between items-center text-sm text-gray-600 ${indent ? 'pl-4' : ''}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium">{formatCurrency(amount)}</span>
    </motion.div>
  );
};