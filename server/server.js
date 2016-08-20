const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const middleware = require('./helpers/middleware');
const routers = require('./helpers/routes');
require('./auth/passport');
require('./db/neo4jconfig');
// require('./helpers/seed');
// require('./helpers/seedCreation');

middleware(app);
routers(app);

// App now listening on port 80
server.listen(process.env.PORT_APP, (err) => {
  err ? console.log(`server/server.js 19: server error: ${err}`) :
  console.log(`Server listening on ${process.env.PORT_APP}`);
});

module.exports = io;
