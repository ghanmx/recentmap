import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MapControlPanelProps {
  className?: string;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onCenter?: () => void;
}

export const MapControlPanel: React.FC<MapControlPanelProps> = ({
  className,
  onZoomIn,
  onZoomOut,
  onCenter,
}) => {
  return (
    <div className={cn('flex flex-col space-y-2', className)}>
      {onZoomIn && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onZoomIn}
          className="w-8 h-8 p-0"
        >
          +
        </Button>
      )}
      {onZoomOut && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onZoomOut}
          className="w-8 h-8 p-0"
        >
          -
        </Button>
      )}
      {onCenter && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onCenter}
          className="w-8 h-8 p-0"
        >
          ⌖
        </Button>
      )}
    </div>
  );
};

export default MapControlPanel;