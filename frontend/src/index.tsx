import * as React from 'react';
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/index'

import { App } from './components/App'

ReactDom.render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.getElementById('react-app')
);