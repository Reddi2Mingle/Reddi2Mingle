import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './app/routing';
// import { Provider } from 'react-redux';
// import Store from './app/AppStore.js';
import io from 'socket.io-client';

const socket = io('http://localhost');

// const Entry = () => (
//   <Provider store={Store}>
//     <Routes />
//   </Provider>
// );

ReactDOM.render(<Routes />, document.getElementById('app'));
