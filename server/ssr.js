import React from 'react';
import { renderToString } from 'react-dom/server';
import RightBottomSidebar from '../client/src/components/App.jsx';
const redis = require('./redis.js');

let query = require('./mysqlPool.js');
const databaseEngine = process.env.DATABASE_ENGINE || 'mysql';
if (databaseEngine === 'cassandra') {
  query = require('./cassandraPool.js');
}

module.exports = function(req, res, next, key, id, template) {
  let iniState = {};
  redis.get(key)
    .then(data => {
      if (data) {
        res.send(data);
        return;
      } else {
        return query(`SELECT * FROM business WHERE id =${id}`);
      }
    })
    .then(row => {
      if (row === undefined) return;
      if (databaseEngine === 'cassandra') {
        row = row.rows;
      }
      iniState.business = row;
      return query(`SELECT * FROM business_reviews200 WHERE postal_code='${row[0].postal_code}' LIMIT 4`);
    })
    .then(rows => {
      if (rows === undefined) return;
      if (databaseEngine === 'cassandra') {
        rows = rows.rows;
      }
      iniState.business1 = rows[1];
      iniState.business2 = rows[2];
      iniState.business3 = rows[3];
      iniState.loaded = true;
      const body = renderToString(<RightBottomSidebar businessId={id} initialState={JSON.parse(JSON.stringify(iniState))}></RightBottomSidebar>);
      let html = template({
        body: body,
        initialState: JSON.stringify(iniState)
      });
      res.send(html);
      return redis.set(key, html);
    })
    .then(() => { }) // do nothing with redis set
    .catch(err => {
      console.log('Error ', err);
      res.sendStatus(404);
    });
};