// src/components/App.tsx
import React, { Suspense, ReactNode } from 'react';
import { I18nProvider } from '../theme/i18n/i18nProvider';
import { LayoutProvider, LayoutSplashScreen } from '../theme/layout/core';
import AuthInit from '@/modules/auth/redux/AuthInit';
import { MasterInit } from '../theme/layout/MasterInit';
import { MasterLayout } from '../theme/layout/MasterLayout';
import AuthGuard from './AuthGuard';
import 'react-toastify/dist/ReactToastify.css';

interface AppProps {
  children: ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <AuthGuard>
              <MasterLayout>{children}</MasterLayout>
            </AuthGuard>
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
      <MasterInit />
    </Suspense>
  );
};

export default App;
