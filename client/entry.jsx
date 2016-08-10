import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import Routes from './app/routing';
import Store from './app/AppStore';

const socket = io('http://localhost');

const Entry = () => (
  <Provider store={Store}>
    <Routes />
  </Provider>
);

ReactDOM.render(<Entry />, document.getElementById('app'));
