import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../theme/partials';

const DashboardWrapper = dynamic(() => import('../../modules/pages/dashboard/DashboardWrapper'), {
    loading: () => <FallbackView />,
    ssr: false,
});

const Dashboard = () => {
    return <DashboardWrapper />;
};

export default Dashboard;
