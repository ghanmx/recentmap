import { ReactNode } from 'react';

export interface FloatingPanelProps {
  children: ReactNode;
  className?: string;
  position?: "left" | "right" | "top" | "bottom";
  title?: string;
}

export interface FloatingPanelControlsProps {
  isCollapsed: boolean;
  isMaximized: boolean;
  isDragging: boolean;
  onCollapse: () => void;
  onMaximize: () => void;
  onClose: () => void;
  title: string;
}