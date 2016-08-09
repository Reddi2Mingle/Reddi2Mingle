const Sequelize = require('sequelize');
const sequelize = new Sequelize('reddi2mingle', 'root', 'cake');

const Users = sequelize.define('User', {
  username: Sequelize.STRING,
  redditId: Sequelize.STRING,
});

Users.sync();

exports.Users = Users;
