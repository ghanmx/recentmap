import { useState } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import VehicleForm from "./VehicleForm";
import { TowingProvider } from "@/contexts/TowingContext";
import { RouteDisplay } from "./map/RouteDisplay";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(true);

  const NavContent = () => (
    <>
      <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <h1 className="text-2xl font-heading font-bold text-primary">TowTruck</h1>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <TowingProvider>
          <div className="space-y-6">
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
            <RouteDisplay
              pickupLocation={null}
              dropLocation={null}
            />
          </div>
        </TowingProvider>
      </div>
    </>
  );

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white shadow-lg">
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
        className="fixed bottom-4 left-4 z-50 hidden lg:flex bg-white shadow-lg"
      >
        {isDesktopSidebarVisible ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <div
        className={cn(
          "hidden lg:flex flex-col h-screen bg-white border-r fixed left-0 top-0 transition-all duration-300 shadow-lg z-40",
          isDesktopSidebarVisible ? "w-96" : "w-0 overflow-hidden"
        )}
      >
        <NavContent />
      </div>

      <div className={cn(
        "hidden lg:block transition-all duration-300",
        isDesktopSidebarVisible ? "w-96" : "w-0"
      )} />
    </>
  );
};

export default Sidebar;