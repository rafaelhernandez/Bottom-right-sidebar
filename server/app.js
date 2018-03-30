const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const mainRouter = require('./main-router.js');
const sidebarRouter = require('./sidebar-router.js');
// const morgan = require('morgan');

const app = express();

// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-Parse-Application-Id, X-Parse-REST-API-Key, Content-Type, Accept');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use(express.static(path.resolve('public')));
app.use('/main', mainRouter);
app.use('/api/sidebar', sidebarRouter);

app.get('/', (req, res, next) => res.sendFile('index.html', {root: path.resolve('public')}));

app.get('*', (req, res, next) => res.sendStatus(404));
app.use((err, req, res, next) => res.sendStatus(500));

module.exports = app;
