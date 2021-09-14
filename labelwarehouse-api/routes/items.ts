import express from 'express';
const router = express.Router();

import Ajv from 'ajv';
const ajv = new Ajv();

import itemsGetRequestSchema from '../schemas/ItemsGetRequest.json';
import itemPostRequestSchema from '../schemas/ItemPostRequest.schema.json';

const itemsGetRequestSchemaValidate = ajv.compile(itemsGetRequestSchema);
const itemPostRequestSchemaValidate = ajv.compile(itemPostRequestSchema);

router.get('/', function(req, res, next) {
  if (!itemsGetRequestSchemaValidate(req.body)) {
    res.status(400).json({
      'error': 'Request JSON invalid',
      'details': itemsGetRequestSchemaValidate.errors,
    });
  } else {
    res.json(req.body);
  }
});

router.post('/', function(req, res, next) {
  if (!itemPostRequestSchemaValidate(req.body)) {
    res.status(400).json({
      'error': 'Request JSON invalid',
      'details': itemPostRequestSchemaValidate.errors,
    });
  } else {
    res.json(req.body);
  }
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
  if (!itemPostRequestSchemaValidate(req.body)) {
    res.status(400).json({
      'error': 'Request JSON invalid',
      'details': itemPostRequestSchemaValidate.errors,
    });
  } else {
    res.json(req.body);
  }
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  res.json({
    'action': 'delete',
    'id': id,
  });
});

export default router;
