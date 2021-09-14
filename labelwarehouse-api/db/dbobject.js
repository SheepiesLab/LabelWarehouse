const withDBConnection = require('./dbcontext').withConnection;

const Ajv = require('ajv');
const ajv = new Ajv();

/** */
class DBObject {
  static validate = ajv.compile(require('../schemas/DBObject.schema.json'));
  static allKeys = [];

  /**
   * @param {Object} obj
   */
  constructor(obj) {
    useobj = obj;
    switch (typeof(obj)) {
      case 'string':
        useobj = JSON.parse(obj);
        break;
      case 'object':
        break;
      default:
        useobj = {};
        break;
    };
    if (!this.validate(useobj)) {
      throw validate.errors;
    };

    this.allKeys.forEach((element) => {
      this[element] = useobj[element];
    });
  };

  /**
   * @return {string}
   */
  toString() {
    return JSON.stringify(this, this.keys);
  };
}

module.exports = DBObject;
