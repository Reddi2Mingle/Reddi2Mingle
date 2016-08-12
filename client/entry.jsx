import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import Routes from './app/routing';
import Store from './app/AppStore';
import './assets/styles/app.scss';

const socket = io('http://localhost:3000');

const Entry = () => (
  <Provider store={Store}>
    <Routes />
  </Provider>
);

ReactDOM.render(<Entry />, document.getElementById('app'));
