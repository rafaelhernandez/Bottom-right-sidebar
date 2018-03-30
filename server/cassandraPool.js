const cassandra = require('cassandra-driver');
const distance = cassandra.types.distance;
const redis = require('./redis.js');

 //Connect to the cluster
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'], 
  keyspace: 'chompy',
  pooling: {
    coreConnectionsPerHost: {
      [distance.local]: 10,
      [distance.remote]: 1
    }
  }
});

const executeQuery = q => client.execute(q, []);

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
  query = executeQuerye;
}

module.exports = query;