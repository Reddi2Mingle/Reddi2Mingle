const swipeRouter = require('express').Router();
// const authModel = require('./authModel');
const swipeController = require('./swipeController');
const matchController = require('./matchController');

// Define API routes to /swipe

swipeRouter.post('/', swipeController.likeResponse);
swipeRouter.get('/matches', matchController.showMatches);

module.exports = swipeRouter;

