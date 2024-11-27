import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FloatingPanelContentProps {
  children: ReactNode;
}

export const FloatingPanelContent = ({ children }: FloatingPanelContentProps) => {
  return (
    <motion.div 
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-4 no-drag">
        {children}
      </div>
    </motion.div>
  );
};