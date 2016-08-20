'use strict';
import io from '../server';

let users = {};
io.on('connection', (socket) => {
  socket.on('save my id', (redditId) => {
    users[redditId] = socket.id;
    console.log(`Id saved! Your socket.id: ${socket.id}, and your redditId: ${redditId}`);
  });

  // Sending message to Specific user
  socket.on('send msg', (senderId, receiverId) => {
    if (users[receiverId]) {
      socket.broadcast.to(users[receiverId]).emit('get msg', `You got pinged by ${senderId}`);
    }
  });

  // Remove user from our storage object when they disconnect
  socket.on('disconnect', (redditId) => {
    delete users[redditId];
  });
});
