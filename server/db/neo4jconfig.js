const neo4j = require('neo4j');

// Initialize seraph client
const db = new neo4j.GraphDatabase('http://app55234389-2DSvfe:UxlI4yKGxG8cueLnV1ca@app552343892dsvfe.sb10.stations.graphenedb.com:24789');


exports.db = db;
