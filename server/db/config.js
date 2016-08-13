const seraph = require('seraph');
const model = require('seraph-model');
// Initialize seraph client

const db = seraph({
  server: 'http://localhost:7474',
  user: 'neo4j',
  pass: 'cake',
});
const Person = model(db, 'Person');
const Subreddit = model(db, 'Subreddit');

exports.db = db;