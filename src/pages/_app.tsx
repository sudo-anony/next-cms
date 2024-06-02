import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MetronicI18nProvider } from '../theme/i18n/Metronici18n'
// import store, { persistor } from '../setup/redux/Store'; // This is for saving redux data into local storage
import store from '@/setup/redux/Store';
import '../theme/assets/sass/style.scss';
import '../theme/assets/sass/style.react.scss';
import App from '@/component/App';
const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <GoogleOAuthProvider clientId='1000627454294-d8mi07snuti97b0d55t2d82ve1r2jjbu.apps.googleusercontent.com'>
            <MetronicI18nProvider selectedLang={'fr'}>
                <Provider store={store}>
                    {/* <PersistGate persistor={persistor} loading={<div>Loading...</div>}> */}
                    <App>
                        <Component {...pageProps} />
                    </App>
                    {/* </PersistGate> */}
                </Provider>
            </MetronicI18nProvider>
        </GoogleOAuthProvider>
    );
};

export default MyApp;