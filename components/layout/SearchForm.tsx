'use client';

import { FC, useEffect } from 'react';

interface SearchFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchForm: FC<SearchFormProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (isOpen)
    return (
      <div
        className='fixed inset-0 bg-gray-900 bg-opacity-90 text-white flex items-center justify-center z-50'
        onClick={onClose}
      >
        <div
          className='w-full max-w-2xl px-6 text-center space-y-6'
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className='text-4xl font-bold sm:text-5xl'>Search</h1>
          <p className='text-lg text-light'>
            Find what you&apos;re looking for by entering keywords below.
          </p>
          <form className='relative' action='/search' method='get'>
            <input
              name='q'
              type='text'
              placeholder='Search...'
              className='w-full py-4 pl-6 pr-14 rounded-full text-dark text-lg shadow-lg outline-none focus:ring-4 focus:ring-blue-500'
            />
            <button
              type='submit'
              className='absolute top-1/2 right-4 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold'
            >
              Search
            </button>
          </form>
        </div>
      </div>
    );

  return null;
};

export default SearchForm;
