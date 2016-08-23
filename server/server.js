const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const middleware = require('./helpers/middleware');
const routers = require('./helpers/routes');
require('./auth/passport');
require('./db/neo4jconfig');
// require('./helpers/seedCreation.js');

middleware(app);
routers(app);

var users = {};
io.on('connection', (socket) => {
  console.log('sockets connected!');
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

// App now listening on port 80
server.listen(process.env.PORT_APP, (err) => {
  err ? console.log(`server/server.js 19: server error: ${err}`) :
  console.log(`Server listening on ${process.env.PORT_APP}`);
});

module.exports = io;
