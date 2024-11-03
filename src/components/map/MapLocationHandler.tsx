interface MapLocationHandlerProps {
  selectingPickup: boolean;
  selectingDrop: boolean;
  handleLocationSelect: (location: { lat: number; lng: number }) => void;
}

export const MapLocationHandler = ({
  selectingPickup,
  selectingDrop,
  handleLocationSelect,
}: MapLocationHandlerProps) => {
  const handleClick = (e: L.LeafletMouseEvent) => {
    if (selectingPickup || selectingDrop) {
      handleLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    }
  };

  useMapEvents({
    click: handleClick,
  });

  return null;
};