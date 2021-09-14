const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json(req.body);
});

router.post('/', function(req, res, next) {
  res.json(req.body);
});

router.get('/:id', function(req, res, next) {
  id = req.params.id;
  res.json(req.body);
});

router.put('/:id', function(req, res, next) {
  id = req.params.id;
  res.json(req.body);
});

router.delete('/:id', function(req, res, next) {
  id = req.params.id;
  res.json(req.body);
});

module.exports = router;
