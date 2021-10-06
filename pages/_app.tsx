import '../styles/globals.scss';
import '../styles/navbar.scss';
import '../styles/signup.scss';
import '../styles/login.scss';
import '../styles/create-post.scss';
import '../styles/your-profile.scss';
import '../styles/post.scss';
import '../styles/sidebar.scss';
import '../styles/overlay.scss';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reducer from '../store/reducers/index';

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(reducer);

const persistor = persistStore(store);

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
