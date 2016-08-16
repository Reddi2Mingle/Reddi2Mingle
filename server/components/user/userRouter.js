const userRouter = require('express').Router();
// const userModel = require('./userModel');
const userController = require('./userController');

// Define API routes to /userInfo

userRouter.get('/', userController.queryUserInfo);

module.exports = userRouter;