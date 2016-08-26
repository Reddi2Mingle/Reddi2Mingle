const neo4j = require('neo4j');
const keys = require('../helpers/api_keys');

// Initialize seraph client
// const db = new neo4j.GraphDatabase('http://app55234389-2DSvfe:UxlI4yKGxG8cueLnV1ca@app552343892dsvfe.sb10.stations.graphenedb.com:24789');
const db = new neo4j.GraphDatabase(`http://${keys.NEO4J_USERNAME}:${keys.NEO4J_PW}@${keys.NEO4J_HOST}:7474`);

exports.db = db;
