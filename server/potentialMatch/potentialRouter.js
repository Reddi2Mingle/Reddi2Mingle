const potentialRouter = require('express').Router();
// const potentialModel = require('./potentialModel');
const potentialController = require('./potentialController');

// Define API routes to /potentials

potentialRouter.get('/createPotentials', potentialController.createPotentials);
potentialRouter.get('/', potentialController.queryPotentials);

module.exports = potentialRouter;
