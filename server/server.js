const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const middleware = require('./helpers/middleware');
const routers = require('./helpers/routes');
require('./passport');


// Invoke middleware function on app to 'use' all the middleware functions
middleware(app);

// Invoke routers function on app to provide access to all routes defined
io.on('connection', (socket) => routers(socket, io, app));

// App now listening on port 80
server.listen(3000, (err) => {
  err ? console.log('server error', err) :
  console.log('Server listening on', process.env.PORT || 3000);
});

module.exports = io;
