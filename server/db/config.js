var Sequelize = require('sequelize');
var sequelize = new Sequelize('reddi2mingle', 'root', 'cake');

var Users = sequelize.define('User', {
	username: Sequelize.STRING,
	redditId: Sequelize.STRING
});

Users.sync();

exports.Users = Users;