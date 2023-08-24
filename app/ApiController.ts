const BASE_URL = 'http://127.0.0.1:8000';

export function getFlightsByRoute(
  origin: string,
  destination: string,
): Promise<Response> {
  return fetch(`${BASE_URL}/flights/${origin}/${destination}`);
}

export function getAllRoutes(): Promise<Response> {
  return fetch(`${BASE_URL}/routes`);
}

export function getRoutesByOrigin(origin: string): Promise<Response> {
  return fetch(`${BASE_URL}/routes?origin=${origin}`);
}

export function getRoutesByDestination(destination: string): Promise<Response> {
  return fetch(`${BASE_URL}/routes?destination=${destination}`);
}
