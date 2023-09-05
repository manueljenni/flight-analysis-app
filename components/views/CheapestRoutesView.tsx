'use client';
import { useCheapestRoutes } from '@/app/ApiController';
import { useState } from 'react';
import { columns } from '../routetable/columns';
import { DataTable } from '../routetable/data-table';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function CheapestRoutesView() {
  const [cheapestAirline, setCheapestAirline] = useState<string>();
  const cheapestRoutes = useCheapestRoutes(cheapestAirline);

  return (
    <div className='space-y-8'>
      <h1 className='mb-6 text-left text-2xl'>Cheapest routes</h1>
      <div className='flex items-end gap-6'>
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
