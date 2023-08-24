const BASE_URL = 'http://127.0.0.1:8000';

export function getFlightsByRoute(
  origin: string,
  destination: string,
): Promise<Response> {
  return fetch(`${BASE_URL}/flights/${origin}/${destination}`);
}
