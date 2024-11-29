export const calculateTotalCost = (
  distance: number,
  truckType: 'A' | 'B' | 'C' | 'D',
  requiresManeuver: boolean,
  tollCost: number,
): number => {
  const baseRate =
    {
      A: 18.82,
      B: 20.62,
      C: 23.47,
      D: 32.35,
    }[truckType] || 18.82

  const maneuverCost = requiresManeuver
    ? {
        A: 1219.55,
        B: 1336.73,
        C: 1524.21,
        D: 2101.65,
      }[truckType]
    : 0

  const flagDropFee = {
    A: 528.69,
    B: 607.43,
    C: 721.79,
    D: 885.84,
  }[truckType]

  return distance * baseRate + maneuverCost + flagDropFee + tollCost
}
