var express = require('express');
var router = express.Router();
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
  res.json(req.body);
});

router.get('/search', function(req, res, next) {
  res.json(req.body);
});

router.post('/', function(req, res, next) {
  res.json(req.body);
})

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
