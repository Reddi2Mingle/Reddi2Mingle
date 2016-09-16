const app = require('express')();
const http = require('http');
const redisNpm = require('redis');

const server = http.Server(app);
const io = require('socket.io')(server);
const middleware = require('./helpers/middleware');
const routers = require('./helpers/routes');
require('./auth/passport');
require('./db/neo4jconfig');

middleware(app);
routers(app);

const client = redisNpm.createClient({
  host: 'redis',
});
client.on('error', err => {
  console.log(`Error with redis ${err}`);
});

io.on('connection', socket => {
  socket.on('save my id', redditId => {
    client.set(redditId, socket.id, redisNpm.print);
    client.keys('*', (err, replies) => {
      client.mget(replies, redisNpm.print);
    });
  });

  // Sending ping to Specific user
  socket.on('send new match', payload => {
    const receiverId = payload.receiverId;
    const userInfo = payload.userInfo;
    if (client.get(receiverId)) {
      socket.broadcast.to(client.get(receiverId)).emit('get new match', userInfo);
    }
  });

  socket.on('disconnect', disconnection => {
    console.log(`disconnecting sockets`);
  });
});


module.exports = server;
