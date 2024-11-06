import { useState } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VehicleForm } from "./VehicleForm";
import { RouteDisplay } from "./map/RouteDisplay";
import { CostEstimation } from "./CostEstimation";
import { useSidebar } from "@/contexts/SidebarContext";

const NavContent = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop
}: {
  pickupLocation?: { lat: number; lng: number } | null;
  dropLocation?: { lat: number; lng: number } | null;
  pickupAddress?: string;
  dropAddress?: string;
  onPickupSelect: (location: { lat: number; lng: number; address: string }) => void;
  onDropSelect: (location: { lat: number; lng: number; address: string }) => void;
  onSelectingPickup: (selecting: boolean) => void;
  onSelectingDrop: (selecting: boolean) => void;
}) => (
  <>
    <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-primary/5">
      <h1 className="text-2xl font-heading font-bold text-primary text-center">MRGruas</h1>
    </div>

    <div className="p-6 overflow-y-auto">
      <div className="space-y-6 flex flex-col items-center">
        <VehicleForm
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          pickupAddress={pickupAddress}
          dropAddress={dropAddress}
          serviceType="standard"
          onPickupSelect={onPickupSelect}
          onDropSelect={onDropSelect}
          onSelectingPickup={onSelectingPickup}
          onSelectingDrop={onSelectingDrop}
        />
        <CostEstimation />
        <RouteDisplay
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
        />
      </div>
    </div>
  </>
);

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isOpen: isDesktopSidebarVisible, toggle: toggleDesktopSidebar } = useSidebar();
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [dropLocation, setDropLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [selectingPickup, setSelectingPickup] = useState(false);
  const [selectingDrop, setSelectingDrop] = useState(false);

  const handlePickupSelect = (location: { lat: number; lng: number; address: string }) => {
    setPickupLocation({ lat: location.lat, lng: location.lng });
    setPickupAddress(location.address);
    setSelectingPickup(false);
  };

  const handleDropSelect = (location: { lat: number; lng: number; address: string }) => {
    setDropLocation({ lat: location.lat, lng: location.lng });
    setDropAddress(location.address);
    setSelectingDrop(false);
  };

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-[1000]">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <NavContent
              pickupLocation={pickupLocation}
              dropLocation={dropLocation}
              pickupAddress={pickupAddress}
              dropAddress={dropAddress}
              onPickupSelect={handlePickupSelect}
              onDropSelect={handleDropSelect}
              onSelectingPickup={setSelectingPickup}
              onSelectingDrop={setSelectingDrop}
            />
          </SheetContent>
        </Sheet>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleDesktopSidebar}
        className={cn(
          "fixed bottom-4 left-4 z-[1000] hidden lg:flex",
          "bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
        )}
      >
        {isDesktopSidebarVisible ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <aside 
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-screen",
          "bg-white/95 backdrop-blur-sm border-r shadow-lg z-[1000]",
          "transition-all duration-300 ease-in-out",
          isDesktopSidebarVisible ? "w-96" : "w-0 overflow-hidden"
        )}
      >
        <NavContent
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          pickupAddress={pickupAddress}
          dropAddress={dropAddress}
          onPickupSelect={handlePickupSelect}
          onDropSelect={handleDropSelect}
          onSelectingPickup={setSelectingPickup}
          onSelectingDrop={setSelectingDrop}
        />
      </aside>

      <div 
        className={cn(
          "transition-all duration-300 ease-in-out",
          isDesktopSidebarVisible ? "lg:pl-96" : "lg:pl-0"
        )} 
      />
    </>
  );
};

export default Sidebar;