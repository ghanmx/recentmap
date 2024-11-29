import React from 'react'

interface MapButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

export const MapButton: React.FC<MapButtonProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 p-2 rounded-md ${
        isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
