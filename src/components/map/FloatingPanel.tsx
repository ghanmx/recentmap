import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, X, GripVertical, Maximize2, Minimize2 } from "lucide-react";
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
  const [isMaximized, setIsMaximized] = useState(false);
  const { toast } = useToast();

  const handleDragStart = () => {
    setIsDragging(true);
    toast({
      title: "Panel móvil",
      description: "Puedes mover este panel a cualquier parte de la pantalla",
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
          "fixed z-[1000] bg-white/95 shadow-lg backdrop-blur-sm",
          "transition-all duration-300 ease-in-out hover:scale-105",
          position === "right" && "right-4 top-20",
          position === "left" && "left-4 top-20",
          position === "top" && "top-4 right-4",
          position === "bottom" && "bottom-4 right-4"
        )}
      >
        <Maximize2 className="w-4 h-4 mr-2" />
        Mostrar {title}
      </Button>
    );
  }

  return (
    <Draggable
      handle=".drag-handle"
      onStart={handleDragStart}
      onStop={handleDragStop}
      bounds="parent"
      disabled={isMaximized}
    >
      <div className={cn(
        "fixed bg-white/95 rounded-lg shadow-xl backdrop-blur-sm transition-all duration-300",
        isMaximized ? "inset-4 !transform-none" : cn(
          position === "right" && "right-6 top-24",
          position === "left" && "left-6 top-24",
          position === "top" && "top-6 inset-x-6",
          position === "bottom" && "bottom-6 inset-x-6",
        ),
        "z-[1000]",
        isDragging && "cursor-grabbing shadow-2xl scale-[1.02]",
        !isMaximized && "hover:shadow-lg hover:shadow-primary/5",
        className
      )}>
        <div className={cn(
          "flex items-center justify-between p-3 border-b",
          "bg-gradient-to-r from-primary/5 to-primary/10",
          "rounded-t-lg"
        )}>
          <div className="flex items-center gap-2">
            {!isMaximized && (
              <div className="drag-handle cursor-grab active:cursor-grabbing p-1.5 hover:bg-primary/10 rounded-md">
                <GripVertical className="h-4 w-4 text-primary/70" />
              </div>
            )}
            <h3 className="font-semibold text-sm text-primary/90">{title}</h3>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 h-8 w-8 hover:bg-primary/10"
            >
              {isCollapsed ? 
                <ChevronUp className="h-4 w-4 text-primary/70" /> : 
                <ChevronDown className="h-4 w-4 text-primary/70" />
              }
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 h-8 w-8 hover:bg-primary/10"
            >
              {isMaximized ? 
                <Minimize2 className="h-4 w-4 text-primary/70" /> : 
                <Maximize2 className="h-4 w-4 text-primary/70" />
              }
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false);
                toast({
                  title: "Panel oculto",
                  description: "Haz clic en 'Mostrar Panel' para restaurar",
                  duration: 2000,
                });
              }}
              className="p-1.5 h-8 w-8 hover:bg-primary/10"
            >
              <X className="h-4 w-4 text-primary/70" />
            </Button>
          </div>
        </div>
        <div className={cn(
          "transition-all duration-300 overflow-hidden",
          isCollapsed ? "h-0" : isMaximized ? "p-6" : "p-4",
          !isCollapsed && "animate-in fade-in-50"
        )}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};