const userRouter = require('express').Router();
const userController = require('./userController');

// Define API routes to /userInfo

userRouter.get('/', userController.queryUserInfo);
userRouter.post('/updatePassword', userController.updatePassword);
userRouter.post('/addPreference', userController.addPreference);
userRouter.post('/addPhoto', userController.addPhoto);
userRouter.post('/loginCredentials', userController.updateAccessToken);

module.exports = userRouter;
