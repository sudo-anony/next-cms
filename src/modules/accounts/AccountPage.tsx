import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageLink, PageTitle } from '../../../theme/layout/core';
import { Overview } from './components/Overview';
import { Settings } from './components/settings/Settings';
import { AccountHeader } from './AccountHeader';

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Account',
    path: '/crafted/account/overview',
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

const AccountPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  useEffect(() => {
    // Handle unauthorized access or other scenarios
    if (pathname === '/crafted/account/settings' && !isUserAllowedToAccessSettings()) {
      // Redirect the user to the overview page if not allowed to access settings
      navigate('/crafted/account/overview', { replace: true });
    }
  }, [pathname, navigate]);

  const isUserAllowedToAccessSettings = () => {
    // Add your logic here to check if the user is allowed to access settings
    // For example, you can check the user's role or permissions
    // Return true if allowed, false otherwise
    return true; // Placeholder logic, replace with actual logic
  };

  return (
    <>
      <AccountHeader />
      {pathname === '/crafted/account/overview' && (
        <>
          <PageTitle breadcrumbs={accountBreadCrumbs}>Overview</PageTitle>
          <Overview />
        </>
      )}
      {pathname === '/crafted/account/settings' && (
        <>
          <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
          <Settings />
        </>
      )}
    </>
  );
};

export default AccountPage;
