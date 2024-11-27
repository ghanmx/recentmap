import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MapButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

export const MapButton = ({ 
  icon, 
  label, 
  isActive, 
  onClick, 
  className,
  ...props 
}: MapButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex-1"
    >
      <Button 
        variant={isActive ? "secondary" : "outline"}
        onClick={onClick}
        className={cn(
          "w-full flex items-center justify-center gap-2 h-11 text-sm font-medium",
          "bg-white/95 backdrop-blur-sm border border-gray-200",
          "hover:bg-primary/10 hover:border-primary/50",
          "transition-all duration-200",
          "shadow-sm hover:shadow-md",
          isActive && "bg-primary/10 border-primary text-primary",
          className
        )}
        {...props}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </Button>
    </motion.div>
  );
};