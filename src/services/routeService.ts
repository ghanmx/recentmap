import { Location, RouteResponse } from "@/types/service";
import { getRouteFromOSRM } from "./osrmService";

export const COMPANY_LOCATION: Location = {
  lat: 25.6866,
  lng: -100.3161
};

export const getRouteDetails = async (
  origin: Location,
  destination: Location
): Promise<RouteResponse> => {
  return await getRouteFromOSRM(origin, destination);
};