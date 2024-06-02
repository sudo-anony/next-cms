import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../../../theme/partials';

const ProfilePage = dynamic(() => import('../../../../modules/profile/ProfilePage'), {
    loading: () => <FallbackView />,
    ssr: false,
});

const Profile = () => {
    return <ProfilePage />;
};

export default Profile;
