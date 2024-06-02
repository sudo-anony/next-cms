import React from 'react';
import dynamic from 'next/dynamic';
import { FallbackView } from '../../theme/partials';

// Ensure that the dynamically imported component has a default export
const MenuTestPage = dynamic(() => import('../../modules/pages/MenuTestPage').then((mod) => mod.default), {
  loading: () => <FallbackView />,
  ssr: false,
});

const MenuTest = () => {
  return <MenuTestPage />;
};

export default MenuTest;
