import { FlightSummary } from '@/app/types';
import { formatDate } from '@/lib/utils';

export function FlightPreview(props: FlightSummary) {
  return (
    <div className='rounded bg-gray-100 p-4 text-left shadow-sm'>
      <div className='grid grid-cols-4 items-center'>
        <p>CHF {props.price}</p>
        <div className='flex flex-col'>
          <p>{formatDate(new Date(props.departure_datetime))}</p>
          <p>{formatDate(new Date(props.return_datetime))}</p>
        </div>
        <p>
          {props.origin} - {props.destination}
        </p>
        <p>{props.airline}</p>
      </div>
    </div>
  );
}
