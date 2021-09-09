var express = require('express');
var router = express.Router();
var LabelWarehouseObject = require('./lwobjects')

class Resource extends LabelWarehouseObject {
    filePath;
    MIMEType;
    constructor(){
        super();
    }

}

/* GET resources listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
