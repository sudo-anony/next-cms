import React from 'react';
import { PageLink, PageTitle } from '../../theme/layout/core';
import { Overview } from './components/Overview';
import { Projects } from './components/Projects';
import { Campaigns } from './components/Campaigns';
import { Documents } from './components/Documents';
import { Connections } from './components/Connections';
import { ProfileHeader } from './ProfileHeader';

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/crafted/pages/profile/overview',
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

const ProfilePage: React.FC = () => {
  const currentPath = window.location.pathname;

  let pageTitle = '';
  let componentToRender = null;
  switch (currentPath) {
    case '/crafted/pages/profile/overview':
      pageTitle = 'Overview';
      componentToRender = <Overview />;
      break;
    case '/crafted/pages/profile/projects':
      pageTitle = 'Projects';
      componentToRender = <Projects />;
      break;
    case '/crafted/pages/profile/campaigns':
      pageTitle = 'Campaigns';
      componentToRender = <Campaigns />;
      break;
    case '/crafted/pages/profile/documents':
      pageTitle = 'Documents';
      componentToRender = <Documents />;
      break;
    case '/crafted/pages/profile/connections':
      pageTitle = 'Connections';
      componentToRender = <Connections />;
      break;
    default:
      pageTitle = 'Unknown';
      break;
  }

  return (
    <>
      <ProfileHeader />
      <PageTitle breadcrumbs={profileBreadCrumbs}>{pageTitle}</PageTitle>
      {componentToRender}
    </>
  );
};

export default ProfilePage;
