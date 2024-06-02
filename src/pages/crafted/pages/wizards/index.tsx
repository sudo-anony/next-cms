import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../../../theme/partials';

const WizardsPage = dynamic(() => import('../../../../modules/wizards/WizardsPage'), {
    loading: () => <FallbackView />,
    ssr: false,
});

const Wizards = () => {
    return <WizardsPage />;
};

export default Wizards;
