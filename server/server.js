const app = require('express')();
const http = require('http');

const server = http.Server(app);
const io = require('socket.io')(server);
const middleware = require('./helpers/middleware');
const routers = require('./helpers/routes');
require('./auth/passport');
require('./db/neo4jconfig');

middleware(app);
routers(app);

const users = {};
io.on('connection', (socket) => {
  console.log('SOCKETS --- sockets connected!');
  socket.on('save my id', (redditId) => {
    users[redditId] = socket.id;
    console.log(`SOCKETS --- Id saved! Your socket.id: ${socket.id}, 
                  and your redditId: ${redditId}`);
    console.log('Heres the cache: ', users);
  });

  // Sending ping to Specific user
  socket.on('send new match', (payload) => {
    const receiverId = payload.receiverId;
    // const senderId = payload.senderId;
    const userInfo = payload.userInfo;
    if (users[receiverId]) {
      socket.broadcast.to(users[receiverId]).emit('get new match', userInfo);
    }
  });

  // Remove user from our storage object when they disconnect
  socket.on('disconnect', (redditId) => {
    delete users[redditId];
  });
});


module.exports = server;
