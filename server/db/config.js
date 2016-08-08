var Sequelize = require('sequelize');
var sequelize = new Sequelize('reddi2mingle', 'root', 'cake');

var User = sequelize.define('User', {
	username: Sequelize.STRING,
	redditId: Sequelize.STRING
});

User.sync();

exports.User = User;