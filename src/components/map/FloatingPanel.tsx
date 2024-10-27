import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingPanelProps {
  children: ReactNode;
  className?: string;
  position?: "left" | "right" | "top" | "bottom";
  title?: string;
}

export const FloatingPanel = ({ 
  children, 
  className, 
  position = "right",
  title = "Panel" 
}: FloatingPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsVisible(true)}
        className={cn(
          "fixed z-[1000] bg-white/95 shadow-lg",
          position === "right" && "right-4 top-20",
          position === "left" && "left-4 top-20",
          position === "top" && "top-4 right-4",
          position === "bottom" && "bottom-4 right-4"
        )}
      >
        Show {title}
      </Button>
    );
  }

  return (
    <div className={cn(
      "fixed bg-white/95 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300",
      position === "right" && "right-4 top-20",
      position === "left" && "left-4 top-20",
      position === "top" && "top-4 inset-x-4",
      position === "bottom" && "bottom-4 inset-x-4",
      "z-[1000] hover:z-[1001]",
      className
    )}>
      <div className="flex items-center justify-between p-2 border-b">
        <h3 className="font-semibold text-sm">{title}</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 h-8 w-8"
          >
            {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="p-1 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        isCollapsed ? "h-0" : "p-4"
      )}>
        {children}
      </div>
    </div>
  );
};