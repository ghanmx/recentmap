import { Location, RouteResponse } from "@/types/service";
import { getRouteFromOSRM } from "./osrmService";

export const COMPANY_LOCATION: Location = {
  lat: 26.509672,
  lng: -100.0095504
};

export const getRouteDetails = async (
  origin: Location,
  destination: Location
): Promise<RouteResponse> => {
  return await getRouteFromOSRM(origin, destination);
};