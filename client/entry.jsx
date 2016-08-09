import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './app/AppStore.js';
import Routes from './app/routing';

const Entry = () => (
  <Provider store={Store}>
    <Routes />
  </Provider>
);

ReactDOM.render(<Entry />, document.getElementById('app'));
