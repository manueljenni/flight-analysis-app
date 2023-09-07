'use client';

import { FlightSummary } from '@/app/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { PricingPopover } from '../PricingPopover';
import { Button } from '../ui/button';

export const columns: ColumnDef<FlightSummary>[] = [
  {
    id: 'route',
    accessorFn: (row) => row.origin + ' - ' + row.destination,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Route
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p>{row.getValue('route')}</p>;
    },
  },
  {
    id: 'airline',
    accessorKey: 'airline',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Airline
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const originalRow = row.original;
      const price = originalRow.price;
      const averagePrice = originalRow.averagePrice;
      return (
        <div className='flex items-center justify-center space-x-2'>
          <p>{formatCurrency(price)}</p>
          <PricingPopover
            percentageDifference={(price - averagePrice) / averagePrice}
            priceDifference={price - averagePrice}
            currentPrice={price}
            averagePrice={averagePrice}
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'departure_datetime',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Dep.
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p>{formatDate(new Date(row.getValue('departure_datetime')))}</p>;
    },
  },
  {
    accessorKey: 'return_datetime',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ret.
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p>{formatDate(new Date(row.getValue('return_datetime')))}</p>;
    },
  },
];
