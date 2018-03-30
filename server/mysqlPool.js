// const mysql = require('mysql');
const Promise = require('bluebird');
const mysql = require('promise-mysql');
const redis = require('./redis.js');
const databaseHost = process.env.DATABASE_HOST || 'localhost';
const databasePort = process.env.DATABASE_PORT || 3306;

const pool = mysql.createPool({
  connectionLimit: 140,
  host: databaseHost,
  port: databasePort,
  user: 'chompy',
  database: 'chompy',
  password: 'Chompy4&!database',
  debug: false
});

const executeQuery = q => {
  return pool.query(q).then(rows => {
    return rows;
  })
  .catch(err => {
    console.log('Error: ', err);
    res.sendStatus(500);
  });
};

const executeQueryWithCache = (q, key) => {
  if (key) {
    let needToCache = false;
    return redis.get(key)
    .then(data => {
      if (data) {
        return JSON.parse(data);
      } else {
        needToCache = true;
        return executeQuery(q);
      }
    })
    .then(rows => {
      if (needToCache) {
        Promise.resolve(redis.set(key, JSON.stringify(rows)));
      }
      return rows;
    })
    .catch(err => {
      console.log('Error ', err);
    });
  } else {
    return executeQuery(q);
  }
};

const isCached = process.env.CACHE || 'redis';
let query = executeQueryWithCache;
if (isCached === 'none') {
  query = executeQuery;
}

module.exports = query;