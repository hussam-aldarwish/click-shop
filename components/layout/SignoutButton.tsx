'use client';

import { signOut } from 'next-auth/react';
import Swal from 'sweetalert2';

const SignoutButton = () => {
  const handleSignOut = () => {
    Swal.fire({
      text: 'Are you sure you want to sign out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sign Out',
      cancelButtonText: 'Cancel',
    }).then((res) => {
      if (res.isConfirmed) {
        signOut();
      }
    });
  };
  return (
    <button
      className='w-full p-4 bg-red-500 text-white font-bold rounded-md'
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default SignoutButton;
