'use client';

import { fetchUrl } from './swr';
import { FlightSummary, Route } from './types';

export const BASE_URL =
  'https://google-flights-scraper-321c3fd96424.herokuapp.com';

export function useFlightsByRoute(origin?: string, destination?: string) {
  if (!origin && destination !== undefined)
    return fetchUrl<FlightSummary[]>(`/flights?destination=${destination}`);
  else if (origin !== undefined && !destination)
    return fetchUrl<FlightSummary[]>(`/flights?origin=${origin}`);
  else if (origin !== undefined && destination)
    return fetchUrl<FlightSummary[]>(
      `/flights?origin=${origin}&destination=${destination}`,
    );
  else return fetchUrl<FlightSummary[]>(`/flights`);
}

export function useAllRoutes() {
  return fetchUrl<Route[]>(`/routes`);
}

export function useRoutesByOrigin(origin: string) {
  return fetchUrl<Route[]>(`/routes?origin=${origin}`);
}

export function useRoutesByDestination(destination: string) {
  return fetchUrl<Route[]>(`/routes?destination=${destination}`);
}
