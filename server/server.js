const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('./passport.js');

module.exports = io;

// Invoke middleware function on app to 'use' all the middleware functions
const middleware = require('./helpers/middleware.js');
middleware(app);

// Invoke routers function on app to provide access to all routes defined
const routers = require('./helpers/routes.js');
io.on('connection', (socket) => routers(socket, io, app));

// App now listening on port 80
server.listen(3000, (err) => {
	err ? console.log('server error', err) : console.log('Server listening on', process.env.PORT || 3000);
});