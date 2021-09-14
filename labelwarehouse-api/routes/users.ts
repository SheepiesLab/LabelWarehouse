import express from 'express';
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json(req.body);
});

router.post('/', function(req, res, next) {
  res.json(req.body);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  res.json(req.body);
});

router.put('/:id', function(req, res, next) {
  const id = req.params.id;
  res.json(req.body);
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  res.json(req.body);
});

export default router;
