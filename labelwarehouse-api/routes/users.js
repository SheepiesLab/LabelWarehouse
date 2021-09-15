const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json(req.body);
});

router.post('/', function(req, res, next) {
  res.json(req.body);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  res.json({
    'action': 'get',
    'id': id,
  });
});

router.put('/:id', function(req, res, next) {
  const id = req.params.id;
  res.json({
    'action': 'put',
    'id': id,
  });
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  res.json({
    'action': 'delete',
    'id': id,
  });
});

module.exports = router;
