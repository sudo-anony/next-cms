import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../../theme/partials';

const AccountPage = dynamic(() => import('../../../modules/accounts/AccountPage'), {
    loading: () => <FallbackView />,
    ssr: false,
});

const Account = () => {
    return <AccountPage />;
};

export default Account;
