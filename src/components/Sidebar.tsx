import { useState } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import VehicleForm from "./VehicleForm";
import { RouteDisplay } from "./map/RouteDisplay";
import { CostEstimation } from "./CostEstimation";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(true);

  const NavContent = () => (
    <>
      <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-primary/5">
        <h1 className="text-2xl font-heading font-bold text-primary text-center">TowTruck</h1>
      </div>

      <div className="p-6 overflow-y-auto">
        <div className="space-y-6 flex flex-col items-center">
          <VehicleForm
            pickupLocation={null}
            dropLocation={null}
            pickupAddress=""
            dropAddress=""
            serviceType="standard"
            onManeuverChange={() => {}}
            onVehicleModelChange={() => {}}
            onPickupSelect={() => {}}
            onDropSelect={() => {}}
          />
          <CostEstimation />
          <RouteDisplay
            pickupLocation={null}
            dropLocation={null}
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsDesktopSidebarVisible(!isDesktopSidebarVisible)}
        className="fixed bottom-4 left-4 z-50 hidden lg:flex bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
      >
        {isDesktopSidebarVisible ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <aside className={cn(
        "hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white/95 backdrop-blur-sm border-r shadow-lg z-40",
        "transition-all duration-300 ease-in-out",
        isDesktopSidebarVisible ? "w-96" : "w-0 overflow-hidden"
      )}>
        <NavContent />
      </aside>

      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isDesktopSidebarVisible ? "lg:pl-96" : "lg:pl-0"
      )} />
    </>
  );
};

export default Sidebar;