var express = require('express');
var router = express.Router();

const Ajv = require("ajv");
const ajv = new Ajv();

const resourceSchema = require('../schemas/Resource.schema.json');
const resourcesGetRequestSchema = require('../schemas/ResourcesGetRequest.schema.json');
const resourcePostRequestSchema = require('../schemas/ResourcePostRequest.schema.json')

const resourceSchemaValidate = ajv.compile(resourceSchema);
const resourcesGetRequestSchemaValidate = ajv.compile(resourcesGetRequestSchema);
const resourcePostRequestSchemaValidate = ajv.compile(resourcePostRequestSchema);

var LabelWarehouseObject = require('./lwobjects')

class Resource extends LabelWarehouseObject {
    filePath;
    MIMEType;
    constructor(){
        super();
    }

}

router.get('/', function(req, res, next) {
  if (!resourcesGetRequestSchemaValidate(req.body)){
    res.status(400).json({
      "error": "Request JSON invalid",
      "details": resourcesGetRequestSchemaValidate.errors
    })
  }
  else {
    res.json(req.body);
  }
});

router.post('/', function(req, res, next) {
  if (!resourcePostRequestSchemaValidate(req.body)){
    res.status(400).json({
      "error": "Request JSON invalid",
      "details": resourcePostRequestSchemaValidate.errors
    })
  }
  else {
    res.json(req.body);
  }
})

router.get('/:id', function(req, res, next) {
  id = req.params.id;
  res.json({
    "action": "get",
    "id": id
  });
});

router.put('/:id', function(req, res, next) {
  if (!resourcePostRequestSchemaValidate(req.body)){
    res.status(400).json({
      "error": "Request JSON invalid",
      "details": resourcePostRequestSchemaValidate.errors
    })
  }
  else {
    res.json(req.body);
  }
});

router.delete('/:id', function(req, res, next) {
  id = req.params.id;
  res.json({
    "action": "delete",
    "id": id
  });
});

module.exports = router;
