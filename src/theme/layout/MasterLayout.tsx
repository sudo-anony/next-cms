import React, { useEffect, ReactNode, FC, useState } from 'react';
import { useRouter } from 'next/router';
import { AsideDefault } from './components/aside/AsideDefault';
import { Footer } from './components/Footer';
import { HeaderWrapper } from './components/header/HeaderWrapper';
import { Toolbar } from './components/toolbar/Toolbar';
import { ScrollTop } from './components/ScrollTop';
import { Content } from './components/Content';
import { PageDataProvider, useLayout } from './core';
import {
  DrawerMessenger,
  ExploreMain,
  ActivityDrawer,
  Main,
  InviteUsers,
  UpgradePlan,
} from '../partials';
import { MenuComponent } from '../../theme/assets/ts/components';
import clsx from 'clsx';
import Fade from '@mui/material/Fade';

type MasterLayoutProps = {
  children?: ReactNode;
};

const MasterLayout: FC<MasterLayoutProps> = ({ children }) => {
  const { classes } = useLayout();
  const router = useRouter();
  const paths = process.env.NEXT_PUBLIC_HIDE_LAYOUT_URLS ? process.env.NEXT_PUBLIC_HIDE_LAYOUT_URLS.split(',') : [];
  const startExam = paths.includes(router.pathname);
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
      setShowContent(true);
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, [router.pathname]);

  return (
    <PageDataProvider>
      {!startExam && (
        <div className='container page d-flex flex-row flex-column-fluid'>
          <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
            <HeaderWrapper />

            <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
              <Toolbar />
              <div
                className={clsx(
                  'd-flex flex-column-fluid align-items-start',
                  classes.contentContainer.join(' ')
                )}
                id='kt_post'
              ></div>
            </div>

          </div>
        </div>
      )}

      <AsideDefault />
      {/* <Fade in={showContent} timeout={1500}> */}
      <Content>{children}</Content>
      {/* </Fade> */}

      {!startExam && (
        <Footer />
      )}

      {/* begin:: Drawers */}
      <ActivityDrawer />
      <ExploreMain />
      <DrawerMessenger />
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <Main />
      <InviteUsers />
      <UpgradePlan />
      {/* end:: Modals */}
      <ScrollTop />
    </PageDataProvider>
  );
};

export { MasterLayout };
