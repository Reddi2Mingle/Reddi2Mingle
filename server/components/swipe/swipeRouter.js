const swipeRouter = require('express').Router();
// const swipeModel = require('./swipeModel');
const swipeController = require('./swipeController');

// Define API routes to /swipe

swipeRouter.post('/', swipeController.likeResponse);
swipeRouter.get('/matches', swipeController.showMatches);

module.exports = swipeRouter;

