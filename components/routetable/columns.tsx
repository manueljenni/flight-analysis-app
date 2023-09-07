'use client';

import { formatCurrency } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { PricingPopover } from '../PricingPopover';
import { Button } from '../ui/button';

export const columns: ColumnDef<{
  origin: string;
  destination: string;
  price: number;
  airline: string;
  averagePrice: number;
}>[] = [
  {
    id: 'origin',
    accessorFn: (row) => row.origin,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Origin
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p>{row.getValue('origin')}</p>;
    },
  },
  {
    id: 'destination',
    accessorFn: (row) => row.destination,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Destination
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p>{row.getValue('destination')}</p>;
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
];
