const server = require('./server');
const keys = require('./helpers/api_keys');

server.listen(keys.PORT_APP, err => {
  err ? console.log(`server/server.js 19: server error: ${err}`) :
  console.log(`Server listening on ${keys.PORT_APP}`);
});
