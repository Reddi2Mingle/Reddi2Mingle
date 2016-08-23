import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './app/routing';
import { store } from './app/AppStore';
import './assets/styles/app.scss';

const Entry = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

ReactDOM.render(<Entry />, document.getElementById('app'));
