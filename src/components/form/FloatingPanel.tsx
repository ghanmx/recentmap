import { ReactNode } from 'react'

interface FloatingPanelProps {
  title: ReactNode
  children: ReactNode
  position?: 'left' | 'right'
  className?: string
}

export const FloatingPanel = ({
  title,
  children,
  position = 'left',
  className = '',
}: FloatingPanelProps) => {
  const positionClasses = {
    left: 'left-4',
    right: 'right-4',
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} bottom-4 p-4 rounded-lg ${className}`}
    >
      <div className="font-semibold mb-4">{title}</div>
      {children}
    </div>
  )
}