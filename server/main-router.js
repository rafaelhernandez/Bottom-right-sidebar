const express = require('express');
const path = require('path');
const ssr = require('./ssr.js');
const Html = require('./Html');
const router = express.Router();

router.route('/ssr/:id')
  .get((req, res, next) => {
    let id = ParseInt(req.params.id);
    if (id > 1) {
      ssr(req, res, next, 'SSR_' + id, id, Html); 
    } else {
      res.sendStatus(404);
    }
  })
  .options((req, res) => {
    res.sendStatus(200);
  });

router.route('/:id')
  .get((req, res, next) => 
    res.sendFile('index.html', { root: path.resolve('public') })
  )
  .options((req, res) => {
    res.sendStatus(200);
  });

module.exports = router;