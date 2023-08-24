'use client';
import { columns } from '@/components/flighttable/columns';
import { DataTable } from '@/components/flighttable/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { getFlightsByRoute } from './ApiController';
import { FlightSummary } from './types';

export default function Home() {
  const [flights, setFlights] = React.useState<FlightSummary[]>([]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      origin: { value: string };
      destination: { value: string };
    };

    if (target.origin.value === '' || target.destination.value === '') {
      return;
    }

    const flightsResponse = await getFlightsByRoute(
      target.origin.value,
      target.destination.value,
    );

    if (flightsResponse.status === 200) {
      const data = await flightsResponse.json();
      setFlights(data);
    }
  }

  return (
    <div className='h-screen px-12'>
      <div className='center-div mt-12'>
        <div className='flex w-full flex-col items-center space-y-12'>
          <form
            className='flex w-full items-end justify-center gap-4'
            onSubmit={submit}
          >
            <div className='w-full space-y-2'>
              <Label htmlFor='origin'>Origin</Label>
              <Input placeholder='e.g. "ZRH"' id='origin' />
            </div>
            <div className='w-full space-y-2'>
              <Label htmlFor='destination'>Destination</Label>
              <Input placeholder='e.g. "BKK"' id='destination' />
            </div>
            <Button type='submit'>Search</Button>
          </form>
          <div className='w-full'>
            <div className='space-y-2'>
              {flights.length > 0 && (
                <DataTable columns={columns} data={flights} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
