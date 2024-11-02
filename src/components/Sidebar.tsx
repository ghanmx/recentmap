import { useState } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import VehicleForm from "./VehicleForm";
import { TowingProvider } from "@/contexts/TowingContext";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(true);

  const NavContent = () => (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-heading font-bold text-primary">TowTruck</h1>
      </div>

      <div className="flex-1 px-4 overflow-y-auto">
        <TowingProvider>
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
        </TowingProvider>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsDesktopSidebarVisible(!isDesktopSidebarVisible)}
        className="fixed bottom-4 left-4 z-50 hidden lg:flex"
      >
        {isDesktopSidebarVisible ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex flex-col h-screen bg-white border-r fixed left-0 top-0 transition-all duration-300",
          isDesktopSidebarVisible ? "w-96" : "w-0 overflow-hidden"
        )}
      >
        <NavContent />
      </div>

      {/* Spacer for content */}
      <div className={cn(
        "hidden lg:block transition-all duration-300",
        isDesktopSidebarVisible ? "w-96" : "w-0"
      )} />
    </>
  );
};

export default Sidebar;