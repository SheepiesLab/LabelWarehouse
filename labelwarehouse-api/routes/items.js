var express = require('express');
var router = express.Router();
var LabelWarehouseObject = require('./lwobjects')

class Item extends LabelWarehouseObject {
    label;
    isReal;
    inContainer;
    resources;
    constructor(){
        super();
    }

}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
