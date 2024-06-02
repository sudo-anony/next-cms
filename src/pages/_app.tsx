// Import necessary modules
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MetronicI18nProvider } from '../theme/i18n/Metronici18n';
import store from '@/setup/redux/Store';
import { setupAxios } from '@/setup';
import axios from 'axios';
import '../theme/assets/sass/style.scss';
import '../theme/assets/sass/style.react.scss';
import App from '@/component/App';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Setup Axios with interceptors
setupAxios(axios, store);

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <GoogleOAuthProvider clientId='1000627454294-d8mi07snuti97b0d55t2d82ve1r2jjbu.apps.googleusercontent.com'>
            <MetronicI18nProvider selectedLang={'fr'}>
                <Provider store={store}>
                    <App>
                        <Component {...pageProps} />
                        <ToastContainer
                            position="top-center"
                            autoClose={3000}
                            limit={3}
                            hideProgressBar
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                            transition={Bounce}
                        />
                    </App>
                </Provider>
            </MetronicI18nProvider>
        </GoogleOAuthProvider>
    );
};

export default MyApp;
