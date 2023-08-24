'use client';
import { columns } from '@/components/flighttable/columns';
import { DataTable } from '@/components/flighttable/data-table';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useEffect } from 'react';
import {
  getAllRoutes,
  getFlightsByRoute,
  getRoutesByOrigin,
} from './ApiController';
import { FlightSummary } from './types';

export default function Home() {
  const [flights, setFlights] = React.useState<FlightSummary[]>([]);
  const [error, setError] = React.useState('');
  const [allowedDepartures, setAllowedDepartures] = React.useState<string[]>(
    [],
  );
  const [allowedDestinations, setAllowedDestinations] = React.useState<
    string[]
  >([]);
  const [selectedOrigin, setSelectedOrigin] = React.useState('');
  const [selectedDestination, setSelectedDestination] = React.useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (selectedOrigin === '' || selectedDestination === '') {
      setError('Please fill in origin and destination');
      return;
    }

    const flightsResponse = await getFlightsByRoute(
      selectedOrigin,
      selectedDestination,
    );

    if (flightsResponse.ok) {
      const data = await flightsResponse.json();
      setFlights(data);
      setError('');
    } else {
      if (flightsResponse.status === 404) {
        setError('No flights found');
      } else {
        setError('An error occurred - try again.');
      }
      setFlights([]);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const getRoutes = await getAllRoutes();
      if (getRoutes.ok) {
        const data = await getRoutes.json();

        const allowedDepartures = data
          .map((route: any) => route.origin)
          .filter((value: string, index: number, self: string[]) => {
            return self.indexOf(value) === index;
          });

        setAllowedDepartures(allowedDepartures);

        const allowedDestinations = data
          .map((route: any) => route.destination)
          .filter((value: string, index: number, self: string[]) => {
            return self.indexOf(value) === index;
          });

        setAllowedDestinations(allowedDestinations);

        // setSelectedOrigin(allowedDepartures[0] || '');
        // setSelectedDestination(allowedDestinations[0] || '');
      }
    }
    fetchData();
  }, []);

  async function updateSelectedOrigin(origin: string) {
    setSelectedOrigin(origin);
    const allowedDestinationsResponse = await getRoutesByOrigin(origin);
    if (allowedDestinationsResponse.ok) {
      const data = await allowedDestinationsResponse.json();
      setAllowedDestinations(data);

      if (!data.includes(selectedDestination)) {
        setSelectedDestination(data[0] || '');
      }
    }
  }

  return (
    <div className='h-screen px-12'>
      <div className='center-div mt-12'>
        <div className='flex w-full max-w-4xl flex-col items-center space-y-12'>
          <form
            className='flex w-full items-end justify-center gap-4'
            onSubmit={submit}
          >
            <div className='w-full space-y-2'>
              <Label htmlFor='origin'>Origin</Label>
              <Select
                value={selectedOrigin}
                onValueChange={updateSelectedOrigin}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a verified email to display' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allowedDepartures.map((route) => (
                      <SelectItem key={route} value={route}>
                        {route}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='w-full space-y-2'>
              <Label htmlFor='destination'>Destination</Label>
              <Select
                value={selectedDestination}
                onValueChange={setSelectedDestination}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a departure...' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allowedDestinations.map((route) => (
                      <SelectItem key={route} value={route}>
                        {route}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type='submit'>Search</Button>
          </form>
          {error && (
            <p className='rounded-full border border-red-400 bg-red-200 px-4 py-1 text-sm text-red-600'>
              {error}
            </p>
          )}
          <div className='w-full'>
            {flights.length > 0 && (
              <DataTable columns={columns} data={flights} />
            )}
            {flights.length === 0 && (
              <p className='text-center font-medium'>No flights found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
