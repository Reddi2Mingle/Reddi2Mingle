const path = require('path');
const passport = require('passport');
const sequelize = require('./db/config.js');

module.exports = (socket, io, app) => {
	
	// Test from front end
	socket.on('test message', (message) => {
		console.log('!!!!!!', message);
	})

}