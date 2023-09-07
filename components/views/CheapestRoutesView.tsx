'use client';
import { useCheapestRoutes } from '@/app/ApiController';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from '../daterangepicker';
import { columns } from '../routetable/columns';
import { DataTable } from '../routetable/data-table';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function CheapestRoutesView() {
  const [departureDates, setDepartureDates] = useState<DateRange | undefined>(
    undefined,
  );
  const [returnDates, setReturnDates] = useState<DateRange | undefined>(
    undefined,
  );

  const [cheapestAirline, setCheapestAirline] = useState<string>();
  const cheapestRoutes = useCheapestRoutes(
    cheapestAirline,
    departureDates,
    returnDates,
  );

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-left text-2xl font-medium'>Cheapest routes</h1>
        <p className='text-sm text-muted-foreground'>
          Find the cheapest routes within your date range. Then use this to find
          specific flights in the "All flights" table.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='flex w-full flex-col space-y-4'>
          <Label>Departure date</Label>
          <DatePickerWithRange
            dates={departureDates}
            setDates={setDepartureDates}
          />
        </div>
        <div className='flex w-full flex-col space-y-4'>
          <Label>Return date</Label>
          <DatePickerWithRange dates={returnDates} setDates={setReturnDates} />
        </div>
        <div className='flex w-full flex-col space-y-4'>
          <Label>Airline</Label>
          <Input
            placeholder='Filter airlines...'
            value={cheapestAirline}
            onChange={(e) => setCheapestAirline(e.target.value)}
          />
        </div>
      </div>
      {cheapestRoutes.ok && (
        <DataTable
          columns={columns}
          data={cheapestRoutes.value}
          setPage={() => 0}
          currentPage={0}
        />
      )}
      {!cheapestRoutes.ok && !cheapestRoutes.loading && (
        <div className='text-red-500'>{cheapestRoutes.error.message}</div>
      )}
      {cheapestRoutes.loading && (
        <DataTable
          columns={columns}
          data={[]}
          setPage={() => 0}
          currentPage={0}
        />
      )}
    </div>
  );
}
