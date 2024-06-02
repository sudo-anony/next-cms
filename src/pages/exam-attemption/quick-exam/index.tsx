import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../../theme/partials';

const QuickExam = dynamic(() => import('../../../modules/exam-builder/components/QuickExam'), {
    loading: () => <FallbackView />,
    ssr: false,
});

const QuickExams = () => {
    return <QuickExam />;
};

export default QuickExams;
