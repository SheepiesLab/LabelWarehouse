const express = require('express');
const router = express.Router();

const Ajv = require('ajv');
const ajv = new Ajv();

const resourcesGetRequestSchema = require('../schemas/ResourcesGetRequest.schema.json');
const resourcePostRequestSchema = require('../schemas/ResourcePostRequest.schema.json');

const resourcesGetRequestSchemaValidate =
  ajv.compile(resourcesGetRequestSchema);
const resourcePostRequestSchemaValidate =
  ajv.compile(resourcePostRequestSchema);

router.get('/', function(req, res, next) {
  if (!resourcesGetRequestSchemaValidate(req.body)) {
    res.status(400).json({
      'error': 'Request JSON invalid',
      'details': resourcesGetRequestSchemaValidate.errors,
    });
  } else {
    res.json(req.body);
  }
});

router.post('/', function(req, res, next) {
  if (!resourcePostRequestSchemaValidate(req.body)) {
    res.status(400).json({
      'error': 'Request JSON invalid',
      'details': resourcePostRequestSchemaValidate.errors,
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
  if (!resourcePostRequestSchemaValidate(req.body)) {
    res.status(400).json({
      'error': 'Request JSON invalid',
      'details': resourcePostRequestSchemaValidate.errors,
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

module.exports = router;
