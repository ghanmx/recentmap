import { ReactNode, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Menu, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import Draggable from "react-draggable"
import { useSidebar } from "@/contexts/SidebarContext"
import { RouteDisplay } from "./RouteDisplay"
import { CostEstimation } from "../CostEstimation"
import { FloatingPanelHeader } from "./FloatingPanelHeader"
import { FloatingPanelControls } from "./FloatingPanelControls"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FloatingPanelProps {
    children: ReactNode
    className?: string
    position?: "left" | "right" | "top" | "bottom"
    title?: string
}

export const FloatingPanel = ({
    children,
    className,
    position = "right",
    title = "Panel",
}: FloatingPanelProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const [isMaximized, setIsMaximized] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const { isOpen: isDesktopSidebarVisible } = useSidebar()
    const { toast } = useToast()

    // Helpers for state toggling
    const toggleCollapsed = () => setIsCollapsed(!isCollapsed)
    const toggleMaximized = () => setIsMaximized(!isMaximized)
    const resetPanelState = () => {
        setIsCollapsed(false)
        setIsMaximized(false)
        setIsDragging(false)
    }

    const handleDragStart = useCallback(() => {
        setIsDragging(true)
        toast({
            title: "Panel móvil",
            description: "Puedes mover este panel a cualquier parte de la pantalla",
            duration: 2000,
        })
    }, [toast])

    const handleDragStop = useCallback(() => setIsDragging(false), [])

    const handlePanelClose = () => {
        setIsVisible(false)
        toast({
            title: "Panel oculto",
            description: "Haz clic en 'Mostrar Panel' para restaurar",
            duration: 2000,
        })
    }

    const panelContent = (
        <motion.div
            className= "flex flex-col h-full"
    initial = {{ opacity: 0, y: 20 }
}
animate = {{ opacity: 1, y: 0 }}
transition = {{ duration: 0.5 }}
        >
    <FloatingPanelHeader />
    < ScrollArea className = "flex-1 px-6 py-4" >
        <div className="space-y-6" >
            { children }
            < CostEstimation />
            <RouteDisplay pickupLocation={ null } dropLocation = { null} />
                </div>
                </ScrollArea>
                </motion.div>
    )

if (!isVisible) {
    return (
        <Button
                variant= "secondary"
    size = "sm"
    onClick = {() => setIsVisible(true)
}
className = {
    cn(
                    "fixed z-[1000] bg-white/95 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105",
        position === "right" && "right-4 top-20",
    position === "left" && "left-4 top-20",
    position === "top" && "top-4 right-4",
    position === "bottom" && "bottom-4 right-4"
                )}
            >
    <Maximize2 className="w-4 h-4 mr-2" />
        Mostrar { title }
</Button>
        )
    }

return (
    <>
    {/* Mobile View */ }
    < div className = "lg:hidden fixed top-4 left-4 z-[1000]" >
        <Sheet open={ isMobileOpen } onOpenChange = { setIsMobileOpen } >
            <SheetTrigger asChild >
            <Button
                            variant="outline"
size = "icon"
className = "bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
    >
    <Menu className="h-4 w-4" />
        </Button>
        </SheetTrigger>
        < SheetContent side = "left" className = "w-80 p-0 bg-white/95 backdrop-blur-sm" >
            { panelContent }
            </SheetContent>
            </Sheet>
            </div>

{/* Desktop View */ }
{/* Desktop View */ }
<Draggable
                handle=".drag-handle"
onStart = { handleDragStart }
onStop = { handleDragStop }
bounds = "parent"
disabled = { isMaximized || isMobileOpen}
defaultPosition = {{ x: 0, y: 0 }}
cancel = ".no-drag"
    >
    <motion.div
                    initial={ { x: position === "right" ? 100 : -100 } }
animate = {{ x: 0 }}
className = {
    cn(
                        "fixed bg-white/95 rounded-lg shadow-xl backdrop-blur-sm transition-all duration-300",
                        "max-h-[80vh] overflow-hidden z-[1000] hidden lg:block",
        isMaximized
            ? "inset-4 !transform-none"
                            : cn(
                position === "right" && "right-6 top-24",
                position === "left" && "left-6 top-24",
                position === "top" && "top-6 inset-x-6",
                position === "bottom" && "bottom-6 inset-x-6"
            ),
    isDragging && "cursor-grabbing shadow-2xl scale-[1.02]",
    !isMaximized && "hover:shadow-lg hover:shadow-primary/5",
    className
                    )}
                >
    <FloatingPanelControls
                        isCollapsed={ isCollapsed }
isMaximized = { isMaximized }
isDragging = { isDragging }
onCollapse = { toggleCollapsed }
onMaximize = { toggleMaximized }
onClose = { handlePanelClose }
title = { title }
    />
    <div
                        className={
    cn(
        "transition-all duration-300",
        isCollapsed ? "h-0" : isMaximized ? "h-[calc(100vh-8rem)]" : "max-h-[calc(80vh-4rem)]",
        !isCollapsed && "animate-in fade-in-50"
    )
}
                    >
    { panelContent }
    </div>
    </motion.div>
    </Draggable>
    </>
    )
}  
