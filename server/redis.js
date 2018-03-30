const redis = require('redis');
const Promise = require('bluebird');

const host = process.env.REDIS_HOST || 'localhost';
const port = process.env.REDIS_PORT || '6379';
const client = redis.createClient(port, host);
const get = Promise.promisify(client.get, { context: client, cancellation: true });
const set = Promise.promisify(client.set, { context: client, cancellation: true });

client.on("error", function (err) {
  console.log("Redis Error " + err);
});

module.exports = {
  get: get,
  set: set
}