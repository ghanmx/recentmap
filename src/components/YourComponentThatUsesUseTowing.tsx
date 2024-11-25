import React from 'react'
import { useTowing } from '../contexts/TowingContext'

const YourComponentThatUsesUseTowing = () => {
  const {
    totalDistance,
    detectedTolls,
    totalTollCost,
    truckType,
    requiresManeuver,
    updateManeuverRequired,
    selectedVehicleModel,
  } = useTowing()

  return (
    <div>
      <h1>Total Distance: {totalDistance}</h1>
      <h2>Detected Tolls: {JSON.stringify(detectedTolls)}</h2>
      <h3>Total Toll Cost: {totalTollCost}</h3>
      <p>Truck Type: {truckType}</p>
      <p>Requires Maneuver: {requiresManeuver ? 'Yes' : 'No'}</p>
      <p>Selected Vehicle Model: {selectedVehicleModel}</p>
    </div>
  )
}

export default YourComponentThatUsesUseTowing
