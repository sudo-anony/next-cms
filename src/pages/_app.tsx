import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store, { persistor } from '../setup/redux/Store';
import '../theme/assets/sass/style.scss';
import '../theme/assets/sass/style.react.scss';
import App from '@/component/App';
const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <GoogleOAuthProvider clientId='your-client-id'>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
                    <App>
                        <Component {...pageProps} />
                    </App>
                </PersistGate>
            </Provider>
        </GoogleOAuthProvider>
    );
};

export default MyApp;
