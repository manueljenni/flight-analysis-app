import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Pill } from './ui/Pill';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export function PricingPopover(props: {
  averagePrice: number;
  currentPrice: number;
  percentageDifference: number;
  priceDifference: number;
}) {
  const isAverage =
    props.percentageDifference >= -0.05 && props.percentageDifference <= 0.05;
  const isCheaper = props.percentageDifference < -0.05;
  const isMoreExpensive = props.percentageDifference > 0.05;
  const percentageDifference = props.percentageDifference;
  const color = isAverage ? 'yellow' : isCheaper ? 'green' : 'red';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <Pill
            text={
              (props.percentageDifference > 0 ? '+' : '') +
              formatPercentage(percentageDifference)
            }
            color={color}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className='flex w-64 items-center justify-center'>
        <div className='grid gap-4 text-sm'>
          {isAverage && (
            <p>
              <b className='text-yellow-600'>Average price</b> for this route &
              dates
            </p>
          )}
          {isCheaper && (
            <p>
              <b className='text-green-600'>
                {' '}
                {formatPercentage(Math.abs(percentageDifference))} (
                {formatCurrency(props.priceDifference)}) cheaper than average{' '}
              </b>
            </p>
          )}
          {isMoreExpensive && (
            <p>
              <b className='text-red-600'>
                {formatPercentage(percentageDifference)} (
                {formatCurrency(props.priceDifference)})
              </b>{' '}
              more expensive than avg. for this route
            </p>
          )}
          <div className='grid w-full grid-cols-2 gap-x-4 gap-y-1 text-left'>
            <p>This flight</p>
            <p className='text-center'>{formatCurrency(props.currentPrice)}</p>
            <p>Average price</p>
            <p className='text-center'>{formatCurrency(props.averagePrice)}</p>
            <b>Difference</b>
            <b className={`text-${color}-600 text-center`}>
              {formatCurrency(props.priceDifference)}
            </b>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
