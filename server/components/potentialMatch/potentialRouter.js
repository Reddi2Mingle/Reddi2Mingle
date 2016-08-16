const potentialRouter = require('express').Router();
console.log('potentialRouter:', potentialRouter);
// const potentialModel = require('./potentialModel');
const potentialController = require('./potentialController');

// Define API routes to /potentials

potentialRouter.get('/createPotentials', potentialController.createPotentials);
potentialRouter.get('/', potentialController.queryPotentials);

module.exports = potentialRouter;
