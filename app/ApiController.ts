'use client';

import { DateRange } from 'react-day-picker';
import { fetchUrl } from './swr';
import { FlightSummary, Route } from './types';

export const BASE_URL = 'http://127.0.0.1:8000';

export function useFlightsByRoute(
  origin?: string,
  destination?: string,
  airline?: string,
  departureDates?: DateRange,
  returnDates?: DateRange,
  page?: number,
  pageSize?: number,
) {
  var query = '';

  origin == '' ? (origin = undefined) : origin;
  destination == '' ? (destination = undefined) : destination;
  if (!origin && destination !== undefined)
    query += `/flights?destination=${destination}&page=${page}&pageSize=${pageSize}`;
  else if (origin !== undefined && !destination)
    query += `/flights?origin=${origin}&page=${page}&pageSize=${pageSize}`;
  else if (origin !== undefined && destination)
    query += `/flights?origin=${origin}&destination=${destination}&page=${page}&pageSize=${pageSize}`;
  else query += `/flights?page=${page}&pageSize=${pageSize}`;

  if (airline) query += `&airline=${airline}`;

  if (departureDates) {
    if (departureDates.from) {
      query += `&departureDateStart=${departureDates.from
        .toISOString()
        .substr(0, 10)}`;
    }
    if (departureDates.to) {
      query += `&departureDateEnd=${departureDates.to
        .toISOString()
        .substr(0, 10)}`;
    }
  }

  if (returnDates) {
    if (returnDates.from) {
      query += `&returnDateStart=${returnDates.from
        .toISOString()
        .substr(0, 10)}`;
    }
    if (returnDates.to) {
      query += `&returnDateEnd=${returnDates.to.toISOString().substr(0, 10)}`;
    }
  }

  return fetchUrl<FlightSummary[]>(query);
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

export function useCheapestRoutes(airline?: string) {
  var url = `/flights/cheapest`;
  if (airline) url += `?airline=${airline}`;

  return fetchUrl<
    {
      origin: string;
      destination: string;
      price: number;
      airline: string;
    }[]
  >(url);
}
