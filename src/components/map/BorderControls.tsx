import { useMap } from "react-leaflet";

export const BorderControls = () => {
  const map = useMap();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <button 
        className="absolute top-0 left-0 w-full h-12 opacity-0 cursor-n-resize pointer-events-auto touch-pan-up"
        onClick={() => map?.panBy([0, -50])}
      />
      <button 
        className="absolute bottom-0 left-0 w-full h-12 opacity-0 cursor-s-resize pointer-events-auto touch-pan-down"
        onClick={() => map?.panBy([0, 50])}
      />
      <button 
        className="absolute top-0 left-0 h-full w-12 opacity-0 cursor-w-resize pointer-events-auto touch-pan-left"
        onClick={() => map?.panBy([-50, 0])}
      />
      <button 
        className="absolute top-0 right-0 h-full w-12 opacity-0 cursor-e-resize pointer-events-auto touch-pan-right"
        onClick={() => map?.panBy([50, 0])}
      />
    </div>
  );
};