import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-background text-foreground inset-0 absolute'>
      <h1 className='text-6xl font-bold font-poppins'>404</h1>
      <p className='text-xl font-roboto mb-8'>Page Not Found</p>
      <Link href='/' className='text-accent hover:text-primary text-lg'>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
