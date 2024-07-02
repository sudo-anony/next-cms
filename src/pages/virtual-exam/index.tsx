import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../theme/partials';

// Ensure that the dynamically imported component has a default export
const VirtualExam = dynamic(() => import('../../modules/exam-builder/components/virtualExam').then((mod) => mod.default), {
  loading: () => <FallbackView />,
  ssr: false,
});

const MenuTest = () => {
  return <VirtualExam />;
};

export default MenuTest;
