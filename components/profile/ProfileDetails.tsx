'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';

const ProfileDetails = () => {
  const { data: session } = useSession();
  const { user } = session!;

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200'>
      <div className='flex flex-col items-center'>
        <BiUser size={64} className='text-primary' />
        <h1 className='mt-4 text-xl font-semibold text-gray-800'>{user?.name || 'Unknown User'}</h1>
        <p className='mt-2 text-gray-600'>{user?.email || 'No email provided'}</p>
      </div>

      {/* Link to Home Page */}
      <div className='mt-6 flex justify-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80'>
        <Link href='/'>Home</Link>
      </div>
    </div>
  );
};

export default ProfileDetails;
