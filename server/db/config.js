var Sequelize = require('sequelize');
var sequelize = new Sequelize('root', 'reddi2mingle', 'cake');

var User = sequelize.define('User', {
	username: Sequelize.STRING,
	redditId: Sequelize.STRING
});

User.sync();

exports.User = User;