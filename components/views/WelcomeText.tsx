export function WelcomeText() {
  return (
    <div className='space-y-2'>
      <div className='space-y-4'>
        <h1 className='text-4xl font-semibold'>Cheap Business Flights</h1>
        <h2 className='pb-2 text-2xl font-medium'>
          For <span className='gradient-text'>digital nomads</span> and people
          with <span className='gradient-text'>flexible schedules</span>.
        </h2>
        <p>
          Want to fly Business for less? Use this to find routes from alternate
          airports and on different routes. <br />{' '}
          <span className='font-semibold'>Flying to another city first</span>{' '}
          can lead to huge savings.
        </p>
      </div>
      <p className='text-sm font-medium text-main underline underline-offset-4'>
        Example: Zurich to Stockholm to Bangkok for <b>$1,500</b> instead of
        $3,000 for a direct flight.
      </p>
    </div>
  );
}
