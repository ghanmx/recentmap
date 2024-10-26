import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FloatingPanelProps {
  children: ReactNode;
  className?: string;
  position?: "top" | "bottom";
}

export const FloatingPanel = ({ children, className, position = "bottom" }: FloatingPanelProps) => {
  return (
    <div className={cn(
      "fixed left-4 right-4 bg-white/95 p-4 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300",
      position === "top" ? "top-4" : "bottom-4",
      "z-[1000] hover:z-[1001]",
      className
    )}>
      {children}
    </div>
  );
};