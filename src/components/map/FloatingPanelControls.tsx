import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingPanelControlsProps {
  onClose: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  className?: string;
}

export const FloatingPanelControls: React.FC<FloatingPanelControlsProps> = ({
  onClose,
  onSave,
  onCancel,
  className,
}) => {
  return (
    <div className={cn('flex justify-end space-x-2 p-4 border-t', className)}>
      {onCancel && (
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}
      {onSave && (
        <Button
          onClick={onSave}
        >
          Save
        </Button>
      )}
      <Button
        variant="ghost"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
};

export default FloatingPanelControls;