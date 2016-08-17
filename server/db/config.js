const neo4j = require('neo4j');
const seraph = require('seraph');
const model = require('seraph-model');

// Initialize seraph client
const db = new neo4j.GraphDatabase('http://app55234389-2DSvfe:UxlI4yKGxG8cueLnV1ca@app552343892dsvfe.sb10.stations.graphenedb.com:24789');

const Person = model(db, 'Person');
const Subreddit = model(db, 'Subreddit');

exports.db = db;
