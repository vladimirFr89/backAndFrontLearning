import * as React from 'react';
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/index'

import { App } from './components/App'

const Root = () => {
    return (
        <Provider store = {store}>
            <App/>
        </Provider>
    )
};

ReactDom.render(
    <Root/>,
    document.getElementById('react-app')
);