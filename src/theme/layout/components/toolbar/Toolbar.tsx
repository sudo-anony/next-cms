import React from 'react';
import { useLayout } from '../../core/LayoutProvider';
import { Toolbar1 } from './Toolbar1';
import { useRouter } from 'next/router';

const Toolbar = () => {
  const { config } = useLayout();
  const location = useRouter();;
  const paths = process.env.NEXT_PUBLIC_HIDE_LAYOUT_URLS ? process.env.NEXT_PUBLIC_HIDE_LAYOUT_URLS.split(',') : [];
  const shouldToolbar = paths.includes(location.pathname);

  if (shouldToolbar) {
    return null;
  }

  switch (config.toolbar.layout) {
    case 'toolbar1':
      return <Toolbar1 />;
    default:
      return <Toolbar1 />;
  }
};

export { Toolbar };
