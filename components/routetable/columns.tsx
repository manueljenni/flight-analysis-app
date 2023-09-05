'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';

export const columns: ColumnDef<{
  origin: string;
  destination: string;
  price: number;
  airline: string;
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
      const priceInSwissFrancs = new Intl.NumberFormat('de-CH', {
        style: 'currency',
        currency: 'CHF',
      }).format(row.getValue('price'));
      return <p>{priceInSwissFrancs}</p>;
    },
  },
];
