export type FlightSummary = {
  origin: string;
  destination: string;
  airline: string;
  price: number;
  departure_datetime: string;
  return_datetime: string;
};

export type Route = {
  origin: string;
  destination: string;
  accessDate: string;
};

export type Result<T, E> =
  | { ok: true; value: T; loading: false }
  | { ok: false; error: E; loading: false }
  | { ok: false; loading: true };

export type ErrorMessage = {
  message: string;
  statusCode: number;
};
