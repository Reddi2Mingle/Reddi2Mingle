const app = require('express')();
const http = require('http');
const redis = require('redis');

const server = http.Server(app);
const io = require('socket.io')(server);
const middleware = require('./helpers/middleware');
const routers = require('./helpers/routes');
require('./auth/passport');
require('./db/neo4jconfig');

middleware(app);
routers(app);

// const users = {};
const client = redis.createClient();
client.on('error', err => {
  console.log(`Error with redis ${err}`);
});

io.on('connection', socket => {
  console.log('SOCKETS --- sockets connected!');
  socket.on('save my id', redditId => {
    client.set(redditId, socket.id, redis.print);
    client.keys('*', (err, replies) => {
      console.log(`cached redditIds ${replies}`);
      client.mget(replies, redis.print);
    });
  });

  // Sending ping to Specific user
  socket.on('send new match', payload => {
    const receiverId = payload.receiverId;
    const userInfo = payload.userInfo;
    if (client.get(receiverId)) {
      console.log('emitting userInfo');
      socket.broadcast.to(client.get(receiverId)).emit('get new match', userInfo);
    }
  });

  socket.on('disconnect', disconnection => {
    console.log(`diconnecting via ${disconnection}`);
  });
});


module.exports = server;
