const express = require('express');
const router = express.Router();

const uuidv4 = require('uuid').v4;

const dbcontext = require('../db/dbcontext');

const Ajv = require('ajv');
const ajv = new Ajv();

const itemsGetRequestSchema = require('../schemas/ItemsGetRequest.schema.json');
const itemPostRequestSchema = require('../schemas/ItemPostRequest.schema.json');

const itemsGetRequestSchemaValidate = ajv.compile(itemsGetRequestSchema);
const itemPostRequestSchemaValidate = ajv.compile(itemPostRequestSchema);

router.get('/', function(req, res, next) {
  if (!itemsGetRequestSchemaValidate(req.body)) {
    res.status(400).json({
      'error': 'Request JSON invalid',
      'details': itemsGetRequestSchemaValidate.errors,
    });
    return;
  }
  res.json(req.body);
});

router.post('/', function(req, res, next) {
  if (!itemPostRequestSchemaValidate(req.body)) {
    res.status(400).json({
      'error': 'Request JSON invalid',
      'details': itemPostRequestSchemaValidate.errors,
    });
    return;
  }

  const itemObject = req.body;
  itemObject.id = uuidv4();

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
  if (!itemPostRequestSchemaValidate(req.body)) {
    res.status(400).json({
      'error': 'Request JSON invalid',
      'details': itemPostRequestSchemaValidate.errors,
    });
    return;
  }
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
