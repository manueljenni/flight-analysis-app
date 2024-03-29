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
  const [departureDates, setDepartureDates] = useState<DateRange | undefined>(
    undefined,
  );
  const [returnDates, setReturnDates] = useState<DateRange | undefined>(
    undefined,
  );
  const [ignoredAirlines, setIgnoredAirlines] = useState<string>();
  const [page, setPage] = useState<number>(0);
  const pageSize = 100;

  const allRoutes = useAllRoutes();
  const allFlights = useFlightsByRoute(
    origin,
    destination,
    airline,
    ignoredAirlines,
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

  function submit() {
    setPage(0);
  }

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-left text-2xl font-medium'>All flights</h1>
      </div>
      <div className='w-full'>
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
            placeholder='Select departure...'
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
            placeholder='Select arrival...'
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
            <Label>Departure dates</Label>
            <DatePickerWithRange
              dates={departureDates}
              setDates={setDepartureDates}
            />
          </div>
          <div className='flex w-full flex-col space-y-4'>
            <Label>Return dates</Label>
            <DatePickerWithRange
              dates={returnDates}
              setDates={setReturnDates}
            />
          </div>
          <div className='flex w-full flex-col space-y-4'>
            <Label>Ignored airline</Label>
            <Input
              placeholder='Ignore these airlines...'
              value={ignoredAirlines}
              onChange={(e) => setIgnoredAirlines(e.target.value)}
            />
          </div>
        </div>
      </div>
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
