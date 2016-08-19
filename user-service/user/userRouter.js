const userRouter = require('express').Router();
const userModel = require('./userModel');
const userController = require('./userController');

// Define API routes to /user-sql
userRouter.post('/createUser', userController.createNewUser);
// userRouter.get('/', userController.queryUserInfo);

module.exports = userRouter;