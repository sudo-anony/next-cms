// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from '../src/setup/redux/Store'; // Import persistor
import { MetronicI18nProvider } from '../src/theme/i18n/Metronici18n';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '../theme/assets/sass/style.scss';
import '../theme/assets/sass/style.react.scss';
import * as _redux from '../src/setup'
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

_redux.setupAxios(axios, store);
Chart.register(...registerables);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GoogleOAuthProvider clientId='1000627454294-d8mi07snuti97b0d55t2d82ve1r2jjbu.apps.googleusercontent.com'>
      <MetronicI18nProvider selectedLang={'fr'}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </MetronicI18nProvider>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
