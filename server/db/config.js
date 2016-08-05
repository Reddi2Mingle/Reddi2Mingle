var Sequelize = require('sequelize');
var sequelize = new Sequelize('reddi2mingle', 'root', 'cake');

var User = sequelize.define('User', {
	username: Sequelize.STRING,
	redditId: Sequelize.STRING

var sequelize = new Sequelize('root', 'reddi2mingle', 'cake');

var User = sequelize.define('User', {
<<<<<<< abc1b29aa571f25ed8f84e36cf6c22f2434f01ce
	username: Sequelize.STRING

=======
	username: Sequelize.STRING,
	redditId: Sequelize.STRING
>>>>>>> merge commit
});

User.sync();

exports.User = User;