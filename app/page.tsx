'use client';
import { columns } from '@/components/flighttable/columns';
import { DataTable } from '@/components/flighttable/data-table';
import { AirportSelect } from '@/components/ui/airportselect';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import {
  useAllRoutes,
  useCheapestRoutes,
  useFlightsByRoute,
} from './ApiController';
import { Route } from './types';

export default function Home() {
  const [origin, setOrigin] = useState<string>();
  const [destination, setDestination] = useState<string>();
  const [airline, setAirline] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(100);

  const allRoutes = useAllRoutes();
  const allFlights = useFlightsByRoute(
    origin,
    destination,
    airline,
    page,
    pageSize,
  );
  const cheapestRoutes = useCheapestRoutes();

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
          <form className='w-full' onSubmit={submit}>
            <div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='col-span-2 flex items-end gap-6'>
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
                <Button type='submit' className='mt-4'>
                  Submit
                </Button>
              </div>
              <div className='flex flex-col space-y-4'>
                <Label>Airline</Label>
                <Input
                  placeholder='Filter airlines...'
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                />
              </div>
            </div>
          </form>
          <div className='w-full'>
            {allFlights.ok && (
              <DataTable
                columns={columns}
                data={allFlights.value}
                setPage={setPage}
                currentPage={page}
              />
            )}
            {!allFlights.ok && !allFlights.loading && (
              <div className='text-red-500'>{allFlights.error.message}</div>
            )}
            {allFlights.loading && (
              <DataTable
                columns={columns}
                data={[]}
                setPage={setPage}
                currentPage={0}
              />
            )}
          </div>
          <div className='w-full'>
            <h1 className='mb-6 text-left text-2xl'>Cheapest routes</h1>
            {cheapestRoutes.ok && (
              <ol className='ml-6'>
                {cheapestRoutes.value.slice(0, 200).map((route) => (
                  <li
                    key={route.origin + '-' + route.destination}
                    className='list-outside list-decimal pb-4 text-lg'
                  >
                    {route.origin} - {route.destination} with {route.airline} (
                    {route.price.toLocaleString('de-ch', {
                      style: 'currency',
                      currency: 'CHF',
                    })}
                    )
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
