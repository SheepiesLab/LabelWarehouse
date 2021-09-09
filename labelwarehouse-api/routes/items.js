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

/* GET items listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
