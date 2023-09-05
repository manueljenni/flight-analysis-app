'use client';
import { useAllRoutes, useFlightsByRoute } from '@/app/ApiController';
import { FlightSummary, Route } from '@/app/types';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { DatePickerWithRange } from '../daterangepicker';
import { columns } from '../flighttable/columns';
import { DataTable } from '../flighttable/data-table';
import { AirportSelect } from '../ui/airportselect';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function AllFlightsView() {
  const [origin, setOrigin] = useState<string>();
  const [destination, setDestination] = useState<string>();
  const [airline, setAirline] = useState<string>();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(100);
  const [departureDates, setDepartureDates] = useState<DateRange | undefined>(
    undefined,
  );
  const [returnDates, setReturnDates] = useState<DateRange | undefined>(
    undefined,
  );

  const allRoutes = useAllRoutes();
  const allFlights = useFlightsByRoute(
    origin,
    destination,
    airline,
    departureDates,
    returnDates,
    page,
    pageSize,
  );

  const [previousPageData, setPreviousPageData] = useState<FlightSummary[]>([]);
  useEffect(() => {
    if (allFlights.ok) {
      setPreviousPageData(allFlights.value);
    }
  }, [allFlights]);

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
    <div className='space-y-8'>
      <form className='w-full' onSubmit={submit}>
        <h1 className='mb-6 text-left text-2xl'>All Flights</h1>
        <div className='grid grid-cols-1 items-end gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
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
          <div className='flex w-full flex-col space-y-4'>
            <Label>Airline</Label>
            <Input
              placeholder='Filter airlines...'
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
            />
          </div>
          <div className='flex w-full flex-col space-y-4'>
            <Label>Departure date</Label>
            <DatePickerWithRange
              dates={departureDates}
              setDates={setDepartureDates}
            />
          </div>
          <div className='flex w-full flex-col space-y-4'>
            <Label>Return date</Label>
            <DatePickerWithRange
              dates={returnDates}
              setDates={setReturnDates}
            />
          </div>
          <Button type='submit' className='w-full'>
            Submit
          </Button>
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
            data={previousPageData}
            setPage={setPage}
            currentPage={0}
          />
        )}
      </div>
    </div>
  );
}
