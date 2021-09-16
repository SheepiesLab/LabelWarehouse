const express = require('express');
const router = express.Router();

const uuidv4 = require('uuid').v4;

const dbcontext = require('../db/dbcontext');

const Ajv = require('ajv');
const ajv = new Ajv();

const itemsGetRequestSchema = require('../schemas/Item/ItemsGetRequest.schema.json');
const itemPostRequestSchema = require('../schemas/Item/ItemPostRequest.schema.json');
const itemPutRequestSchema = require('../schemas/Item/ItemPutRequest.schema.json');

const uuidValidationMiddleware = function(req, res, next) {
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(req.params.id)) {
    next();
  } else {
    res.status(400).json({
      'error': 'Request invalid',
      'details': 'Item id is not a valid UUID',
    });
  }
};

/**
 *
 * @param {object} schema
 * @return {Function}
 */
function schemaValidationMiddleware(schema) {
  const validate = ajv.compile(schema);
  return function(req, res, next) {
    if (validate(req.body)) {
      next();
    } else {
      res.status(400).json({
        'error': 'Request JSON invalid',
        'details': validate.errors,
      });
    }
  };
};

const errorHandlingMiddleware = function(err, req, res, next) {
  res.status(500).json({
    'error': 'JS Exception',
    'details': err,
  });
};

router.get('/',
    schemaValidationMiddleware(itemsGetRequestSchema),
    function(req, res, next) {
      res.json(req.body);
    },
    errorHandlingMiddleware);

const savePostItem = dbcontext.withConnection(async (o) => {
  return await dbcontext.collection.insertOne(o);
}, 'items');

router.post('/',
    schemaValidationMiddleware(itemPostRequestSchema),
    async function(req, res, next) {
      const itemObject = req.body;
      itemObject.id = uuidv4();
      await savePostItem(itemObject);
      res.json(itemObject);
    },
    errorHandlingMiddleware);

const getItemById = dbcontext.withConnection(async (uuid) => {
  const item = await dbcontext.collection.findOne({id: uuid});
  item._id = undefined;
  return item;
}, 'items');

router.get('/:id',
    uuidValidationMiddleware,
    async function(req, res, next) {
      const item = await getItemById(req.params.id);
      res.json(item);
    },
    errorHandlingMiddleware);

const updateItemById = dbcontext.withConnection(async (id, o) => {
  return await dbcontext.collection.findOneAndUpdate({id: id}, {'$set': o});
}, 'items');

router.put('/:id',
    uuidValidationMiddleware,
    schemaValidationMiddleware(itemPutRequestSchema),
    async function(req, res, next) {
      try {
        const itemObject = req.body;
        await updateItemById(req.params.id, itemObject);
        res.json(itemObject);
      } catch (e) {
        console.log(e);
        next(e);
      }
    },
    errorHandlingMiddleware);

router.delete('/:id',
    uuidValidationMiddleware,
    function(req, res, next) {
      next('Not Implemented');
    },
    errorHandlingMiddleware);

module.exports = router;
