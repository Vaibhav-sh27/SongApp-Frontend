import React from "react";
import ReactDom from 'react-dom';
import App from './app/App';
import './index.scss';
import {createStore} from "redux";
import reducers from "./reducers/reducer";
import {Provider} from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from "react";

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDom.render(
    <GoogleOAuthProvider clientId="222953190270-t8t8hdeu3tc3fj88qa1r7k75b6kd0tmt.apps.googleusercontent.com">
    <Provider store={store}>
        <App/>
    </Provider>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);
