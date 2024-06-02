import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../theme/partials';

const ExamBuilder = dynamic(() => import('../../modules/exam-builder/ExamPage'), {
    loading: () => <FallbackView />,
    ssr: false,
});

const ExamAttemption = () => {
    return <ExamBuilder />;
};

export default ExamAttemption;
