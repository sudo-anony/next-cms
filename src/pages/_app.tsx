// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MetronicI18nProvider } from '../theme/i18n/Metronici18n';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store, { persistor } from '../setup/redux/Store';
import '../theme/assets/sass/style.scss';
import '../theme/assets/sass/style.react.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <GoogleOAuthProvider clientId='your-client-id'>
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
