const app = require('express')();
const http = require('http');

http.globalAgent.maxSockets = 1;
const server = http.Server(app);
const io = require('socket.io')(server);
const middleware = require('./helpers/middleware');
const routers = require('./helpers/routes');
require('./auth/passport');
require('./db/neo4jconfig');
// require('./helpers/seedCreation.js');


middleware(app);
routers(app);

const users = {};
io.on('connection', (socket) => {
  console.log('SOCKETS --- sockets connected!');
  socket.on('save my id', (redditId) => {
    users[redditId] = socket.id;
    console.log(`SOCKETS --- Id saved! Your socket.id: ${socket.id}, and your redditId: ${redditId}`);
    console.log('Heres the cache: ', users);
  });

  // Sending ping to Specific user
  socket.on('somethingUnique', (payload) => {
    const receiverId = payload.receiverId;
    const senderId = payload.senderId;
    if (users[receiverId]) {
      socket.broadcast.to(users[receiverId]).emit('get somethingUnique', `You got pinged by ${senderId}`);
    }
  });

  // Remove user from our storage object when they disconnect
  socket.on('disconnect', (redditId) => {
    delete users[redditId];
  });
});

// App now listening on port 80
server.listen(process.env.PORT_APP, (err) => {
  err ? console.log(`server/server.js 19: server error: ${err}`) :
  console.log(`Server listening on ${process.env.PORT_APP}`);
});

module.exports = io;
