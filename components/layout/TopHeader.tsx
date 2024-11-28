import { FaFacebookF, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { SocialMediaIcon } from '../common';

const TopHeader = () => {
  return (
    <div className='bg-light text-dark py-1'>
      <div className='container flex justify-center'>
        <div className='flex space-x-4'>
          <SocialMediaIcon href='https://facebook.com' icon={FaFacebookF} />
          <SocialMediaIcon href='https://x.com' icon={FaXTwitter} />
          <SocialMediaIcon href='https://instagram.com' icon={FaInstagram} />
          <SocialMediaIcon href='https://linkedin.com' icon={FaLinkedin} />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;