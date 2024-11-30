import Link from 'next/link';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { FaLink } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

interface SocialMediaIconProps {
  href: string;
  className?: string;
  icon?: IconType;
  size?: number;
}

// Helper function to determine the hover color class based on the href
const getHoverColorClass = (href: string): string => {
  if (href.includes('facebook.com')) return 'hover:text-blue-600';
  if (href.includes('x.com') || href.includes('twitter.com')) return 'hover:text-blue-400';
  if (href.includes('instagram.com')) return 'hover:text-pink-500';
  if (href.includes('linkedin.com')) return 'hover:text-blue-800';
  return ''; // Default case, no hover color
};

const SocialMediaIcon: FC<SocialMediaIconProps> = ({
  href,
  className,
  icon: Icon = FaLink,
  size = 24,
}) => {
  const hoverColorClass = getHoverColorClass(href);
  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={twMerge(
        'transform rounded-full p-1 shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg my-auto',
        hoverColorClass,
        className,
      )}
      aria-label={`Visit ${href}`}
    >
      <Icon size={size} />
    </Link>
  );
};

export default SocialMediaIcon;
