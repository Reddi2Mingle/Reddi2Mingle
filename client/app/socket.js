import io from 'socket.io-client';
import { pushMatch } from './potential/PotentialActions';

export const socket = io();

export function socketWrapper(store) {
  socket.on('get new match', userInfo => {
    store.dispatch(pushMatch(userInfo));
  });
}
