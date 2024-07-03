import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../theme/partials';

const Result = dynamic(() => import('../../modules/exam-builder/components/result').then((mod) => mod.default), {
    loading: () => <FallbackView />,
    ssr: false,
});

const ResultScreen = () => {
    return <Result />;
};

export default ResultScreen;
