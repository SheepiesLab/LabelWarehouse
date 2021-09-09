var express = require('express');
var router = express.Router();
var LabelWarehouseObject = require('./lwobjects')

class User extends LabelWarehouseObject {
    email;
    group;
    constructor(){
        super();
    }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  res.json(req.body);
})

module.exports = router;
