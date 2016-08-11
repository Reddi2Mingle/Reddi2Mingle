const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const middleware = require('./helpers/middleware');
const routers = require('./helpers/routes');
const seraph = require("seraph");
require('./passport');


// Invoke middleware function on app to 'use' all the middleware functions
middleware(app);

// Invoke routers function on app to provide access to all routes defined
io.on('connection', (socket) => {
  console.log('connected to socket!');
  routers(socket, io, app);
});


// Initialize seraph client
var db = seraph({
  server: "http://neo4j:7474", 
  user: "neo4j",
  pass: "neo4j"
});
db.changePassword('cc',function(err) {
  if (err) {
    console.log('pw changed')
  } else {
    console.log('Successfully changed pw to cc')
  }
})

// Save test result node
// db.save({ name: "Sompop", age: 45 }, function(err, node) {
//   if (err) throw err;
  console.log("SopPop inserted.");

  // db.delete(node, function(err) {
  //   if (err) throw err;
  //   console.log("Test-Man away!");
  // });
// });

// App now listening on port 80
server.listen(80, (err) => {
  err ? console.log('server error', err) :
  console.log('Server listening on', process.env.PORT || 80);
});

module.exports = io;
