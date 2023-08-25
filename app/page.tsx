'use client';
import { columns } from '@/components/flighttable/columns';
import { DataTable } from '@/components/flighttable/data-table';
import { AirportSelect } from '@/components/ui/airportselect';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAllRoutes, useFlightsByRoute } from './ApiController';
import { Route } from './types';

export default function Home() {
  const [origin, setOrigin] = useState<string>();
  const [destination, setDestination] = useState<string>();

  const allRoutes = useAllRoutes();
  const allFlights = useFlightsByRoute(origin, destination);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      origin: { value: string };
      destination: { value: string };
    };
    setOrigin(target.origin.value);
    setDestination(target.destination.value);
  }

  return (
    <div className='h-screen px-12'>
      <div className='center-div mt-12'>
        <div className='flex w-full max-w-4xl flex-col items-center space-y-12'>
          <form
            className='flex w-full flex-col items-end justify-center gap-4 md:flex-row'
            onSubmit={submit}
          >
            <AirportSelect
              title={'Origin'}
              selectOptions={
                allRoutes.ok
                  ? allRoutes.value
                      .map((route: Route) => route.origin)
                      .filter(
                        (value: string, index: number, self: string[]) =>
                          self.indexOf(value) === index,
                      )
                  : []
              }
              name='origin'
              placeholder='Enter a departure...'
              onChange={(value: string) => setOrigin(value)}
            />
            <AirportSelect
              title={'Destination'}
              selectOptions={
                allRoutes.ok
                  ? allRoutes.value
                      .map((route: Route) => route.destination)
                      .filter(
                        (value: string, index: number, self: string[]) =>
                          self.indexOf(value) === index,
                      )
                  : []
              }
              name='destination'
              placeholder='Enter an arrival...'
              onChange={(value: string) => setDestination(value)}
            />
            <Button type='submit' className='mt-4 w-full md:mt-0 md:w-min'>
              Search
            </Button>
          </form>
          <div className='w-full'>
            {allFlights.ok && (
              <DataTable columns={columns} data={allFlights.value} />
            )}
            {!allFlights.ok && !allFlights.loading && (
              <div className='text-red-500'>{allFlights.error.message}</div>
            )}
            {allFlights.loading && <div>Loading...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
