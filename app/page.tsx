'use client';
import AllFlightsView from '@/components/views/AllFlightsView';
import CheapestRoutesView from '@/components/views/CheapestRoutesView';

export default function Home() {
  return (
    <div className='px-4 py-6 md:px-12'>
      <div className='center-div'>
        <div className='flex w-full max-w-4xl flex-col items-center space-y-6'>
          <div className='w-full space-y-6 pt-6'>
            <AllFlightsView />
            <CheapestRoutesView />
          </div>
        </div>
      </div>
    </div>
  );
}
