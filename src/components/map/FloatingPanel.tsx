import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Draggable from "react-draggable";
import { useToast } from "@/hooks/use-toast";

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
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragStart = () => {
    setIsDragging(true);
    toast({
      title: "Panel is now draggable",
      description: "You can move this panel anywhere on the screen",
      duration: 2000,
    });
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

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
    <Draggable
      handle=".drag-handle"
      onStart={handleDragStart}
      onStop={handleDragStop}
      bounds="parent"
    >
      <div className={cn(
        "fixed bg-white/95 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300",
        position === "right" && "right-4 top-20",
        position === "left" && "left-4 top-20",
        position === "top" && "top-4 inset-x-4",
        position === "bottom" && "bottom-4 inset-x-4",
        "z-[1000]",
        isDragging && "cursor-grabbing shadow-2xl",
        className
      )}>
        <div className="flex items-center justify-between p-2 border-b bg-primary/5 rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="drag-handle cursor-grab active:cursor-grabbing p-1 hover:bg-primary/10 rounded-md">
              <GripVertical className="h-4 w-4 text-primary/70" />
            </div>
            <h3 className="font-semibold text-sm text-primary/90">{title}</h3>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 h-8 w-8 hover:bg-primary/10"
            >
              {isCollapsed ? 
                <ChevronUp className="h-4 w-4 text-primary/70" /> : 
                <ChevronDown className="h-4 w-4 text-primary/70" />
              }
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false);
                toast({
                  title: "Panel hidden",
                  description: "Click 'Show Panel' to restore",
                  duration: 2000,
                });
              }}
              className="p-1 h-8 w-8 hover:bg-primary/10"
            >
              <X className="h-4 w-4 text-primary/70" />
            </Button>
          </div>
        </div>
        <div className={cn(
          "transition-all duration-300 overflow-hidden",
          isCollapsed ? "h-0" : "p-4",
          !isCollapsed && "animate-in fade-in-50"
        )}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};