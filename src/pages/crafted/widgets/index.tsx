import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../../theme/partials';

const WidgetsPage = dynamic(() => import('../../../modules/widgets/WidgetsPage'), {
    loading: () => <FallbackView />,
    ssr: false,
});

const Widgets = () => {
    return <WidgetsPage />;
};

export default Widgets;
