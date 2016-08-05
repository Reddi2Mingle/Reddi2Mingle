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
<<<<<<< abc1b29aa571f25ed8f84e36cf6c22f2434f01ce
	err ? console.log('server error', err) : console.log('Server listening on', process.env.PORT || 3000);
=======
	err ? console.log('server error', err) : console.log('server listening on 3000')
>>>>>>> merge commit
});