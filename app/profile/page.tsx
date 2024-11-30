import ProfileDetails from '@/components/profile/ProfileDetails';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

const ProfilePage = () => {
  return <ProfileDetails />;
};

export default ProfilePage;
