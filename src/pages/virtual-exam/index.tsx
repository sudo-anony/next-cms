import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../theme/partials';

const VirtualExamComponent = dynamic(() => import('../../modules/exam-builder/components/VirtualExam'), {
    loading: () => <FallbackView />,
    ssr: false,
});

const VirtualExam = () => {
    return <VirtualExamComponent />;
};

export default VirtualExam;
