import React, { useEffect, ReactNode, FC } from 'react'
import { AsideDefault } from './components/aside/AsideDefault'
import { Footer } from './components/Footer'
import { HeaderWrapper } from './components/header/HeaderWrapper'
import { Toolbar } from './components/toolbar/Toolbar'
import { ScrollTop } from './components/ScrollTop'
import { Content } from './components/Content'
import { PageDataProvider, useLayout } from './core'
import { useLocation } from 'react-router-dom'
import {
  DrawerMessenger,
  ExploreMain,
  ActivityDrawer,
  Main,
  InviteUsers,
  UpgradePlan,
} from '../partials'
import { MenuComponent } from '../../theme/assets/ts/components'
import clsx from 'clsx'
type MasterLayoutProps = {
  children?: ReactNode;
};


const MasterLayout: FC<MasterLayoutProps> = ({ children }) => {

  const { classes } = useLayout()
  const location = useLocation()
  const paths = process.env.REACT_APP_HIDE_LAYOUT_URLS ? process.env.REACT_APP_HIDE_LAYOUT_URLS.split(',') : [];
  const startExam = paths.includes(location.pathname)
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      {!startExam && (<div className='container page d-flex flex-row flex-column-fluid'>
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
            >
            </div>
          </div>
          <Footer />
        </div>
      </div>)}

      <AsideDefault />
      <Content>{children}</Content>
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
  )
}

export { MasterLayout }
