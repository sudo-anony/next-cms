import React from 'react';
import { useLocation } from 'react-router-dom';
import { PageLink, PageTitle } from '../../../theme/layout/core';
import { Charts } from './components/Charts';
import { Feeds } from './components/Feeds';
import { Lists } from './components/Lists';
import { Tables } from './components/Tables';
import { Mixed } from './components/Mixed';
import { Statistics } from './components/Statistics';

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Widgets',
    path: '/crafted/widgets/charts',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
];

const WidgetsPage: React.FC = () => {
  const { pathname } = useLocation();

  let pageTitle = 'Unknown';
  let componentToRender: JSX.Element | null = null;

  switch (pathname) {
    case '/crafted/widgets/charts':
      pageTitle = 'Charts';
      componentToRender = <Charts />;
      break;
    case '/crafted/widgets/feeds':
      pageTitle = 'Feeds';
      componentToRender = <Feeds />;
      break;
    case '/crafted/widgets/lists':
      pageTitle = 'Lists';
      componentToRender = <Lists />;
      break;
    case '/crafted/widgets/mixed':
      pageTitle = 'Mixed';
      componentToRender = <Mixed />;
      break;
    case '/crafted/widgets/tables':
      pageTitle = 'Tables';
      componentToRender = <Tables />;
      break;
    case '/crafted/widgets/statistics':
      pageTitle = 'Statistics';
      componentToRender = <Statistics />;
      break;
    default:
      break;
  }

  return (
    <>
      <PageTitle breadcrumbs={widgetsBreadCrumbs}>
        {pageTitle}
      </PageTitle>
      {componentToRender}
    </>
  );
};

export default WidgetsPage;
