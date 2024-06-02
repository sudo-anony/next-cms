import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../theme/partials';

const BuilderPageWrapper = dynamic(() => import('../../modules/pages/layout-builder/BuilderPageWrapper'), {
    loading: () => <FallbackView />,
    ssr: false,
});

const Builder = () => {
    return <BuilderPageWrapper />;
};

export default Builder;
