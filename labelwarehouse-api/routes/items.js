var express = require('express');
var router = express.Router();

const Ajv = require("ajv");
const ajv = new Ajv();

const itemSchema = require('../schemas/Item.schema.json');
const itemsGetRequestSchema = require('../schemas/ItemsGetRequest.json');
const itemPostRequestSchema = require('../schemas/ItemPostRequest.schema.json');

const itemSchemaValidate = ajv.compile(itemSchema);
const itemsGetRequestSchemaValidate = ajv.compile(itemsGetRequestSchema);
const itemPostRequestSchemaValidate = ajv.compile(itemPostRequestSchema);

var LabelWarehouseObject = require('./lwobjects')

class Item extends LabelWarehouseObject {
    label;
    isReal;
    quantity;
    inContainer;
    resources;
    constructor(){
        super();
    }

}

router.get('/', function(req, res, next) {
  if (!itemsGetRequestSchemaValidate(req.body)){
    res.status(400).json({
      "error": "Request JSON invalid",
      "details": itemsGetRequestSchemaValidate.errors
    })
  }
  res.json(req.body);
});

router.post('/', function(req, res, next) {
  if (!itemPostRequestSchemaValidate(req.body)){
    res.status(400).json({
      "error": "Request JSON invalid",
      "details": itemPostRequestSchemaValidate.errors
    })
  }
  res.json(req.body);
})

router.get('/:id', function(req, res, next) {
  id = req.params.id;
  res.json({
    "action": "get",
    "id": id
  });
});

router.put('/:id', function(req, res, next) {
  id = req.params.id;
  if (!itemPostRequestSchemaValidate(req.body)){
    res.status(400).json({
      "error": "Request JSON invalid",
      "details": itemPostRequestSchemaValidate.errors
    })
  }
  res.json(req.body);
});

router.delete('/:id', function(req, res, next) {
  id = req.params.id;
  res.json({
    "action": "delete",
    "id": id
  });
});

module.exports = router;
