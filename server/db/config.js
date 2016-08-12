const seraph = require('seraph');
const model = require('seraph-model');

// Initialize seraph client
const db = seraph({
  server: 'http://localhost:7474',
  user: 'neo4j',
  pass: 'neo4j',
});
const Person = model(db, 'person');
const Subreddit = model(db, 'subreddit');

exports.db = db;