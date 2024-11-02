import { FloatingPanel } from "./FloatingPanel";
import { MapPin } from "lucide-react";
import VehicleForm from "../VehicleForm";
import { Button } from "../ui/button";
import { useState } from "react";

interface LocationPanelsProps {
  pickupLocation: { lat: number; lng: number } | null;
  dropLocation: { lat: number; lng: number } | null;
  pickupAddress: string;
  dropAddress: string;
  handleLocationSearch: (location: { lat: number; lng: number; address: string }, type: 'pickup' | 'drop') => void;
}

export const LocationPanels = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  handleLocationSearch
}: LocationPanelsProps) => {
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  return (
    <>
      <div className="fixed top-20 right-4 sm:top-24 sm:right-6 z-50 flex flex-col gap-3">
        <Button 
          variant="secondary"
          onClick={() => setShowVehicleForm(!showVehicleForm)}
          className="shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-200 text-sm sm:text-base"
        >
          {showVehicleForm ? "Ocultar Formulario" : "Mostrar Formulario"}
        </Button>
        
        {(pickupAddress || dropAddress) && (
          <Button 
            variant="secondary"
            onClick={() => setShowLocations(!showLocations)}
            className="shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-200 text-sm sm:text-base"
          >
            {showLocations ? "Ocultar Ubicaciones" : "Ver Ubicaciones"}
          </Button>
        )}
      </div>

      {showVehicleForm && (
        <FloatingPanel 
          position="right" 
          className="w-[92vw] sm:w-[450px] max-h-[80vh] overflow-y-auto z-40 
                     bg-white/95 backdrop-blur-sm shadow-xl border border-gray-200/50 rounded-xl
                     fixed top-24 sm:top-32 left-1/2 sm:left-auto sm:right-24 
                     -translate-x-1/2 sm:translate-x-0 transform
                     mx-4 sm:mx-0"
          title="Información del Vehículo"
        >
          <VehicleForm
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            pickupAddress={pickupAddress}
            dropAddress={dropAddress}
            serviceType="standard"
            onManeuverChange={() => {}}
            onVehicleModelChange={() => {}}
            onPickupSelect={(location) => handleLocationSearch(location, 'pickup')}
            onDropSelect={(location) => handleLocationSearch(location, 'drop')}
          />
        </FloatingPanel>
      )}

      {showLocations && (pickupAddress || dropAddress) && (
        <FloatingPanel
          position="left"
          className="hidden sm:block w-[350px] z-40 bg-white/95 backdrop-blur-sm shadow-xl 
                     border border-gray-200/50 rounded-xl fixed top-32 left-6"
          title="Ubicaciones Seleccionadas"
        >
          <div className="space-y-4 p-4">
            {pickupAddress && (
              <div className="space-y-2 p-3 bg-blue-50/50 rounded-lg">
                <div className="font-semibold text-sm text-primary flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Punto de Recogida
                </div>
                <p className="text-sm text-gray-600">{pickupAddress}</p>
              </div>
            )}
            {dropAddress && (
              <div className="space-y-2 p-3 bg-green-50/50 rounded-lg">
                <div className="font-semibold text-sm text-secondary flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Punto de Entrega
                </div>
                <p className="text-sm text-gray-600">{dropAddress}</p>
              </div>
            )}
          </div>
        </FloatingPanel>
      )}

      {/* Mobile locations panel */}
      {showLocations && (pickupAddress || dropAddress) && (
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/95 backdrop-blur-sm 
                        shadow-xl border border-gray-200/50 rounded-xl p-4 space-y-3">
          {pickupAddress && (
            <div className="space-y-2 p-2 bg-blue-50/50 rounded-lg">
              <div className="font-semibold text-xs text-primary flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                Punto de Recogida
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{pickupAddress}</p>
            </div>
          )}
          {dropAddress && (
            <div className="space-y-2 p-2 bg-green-50/50 rounded-lg">
              <div className="font-semibold text-xs text-secondary flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                Punto de Entrega
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{dropAddress}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};