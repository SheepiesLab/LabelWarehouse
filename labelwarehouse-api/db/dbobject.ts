const withDBConnection = require('./dbcontext').withConnection;

import Ajv from 'ajv';
const ajv = new Ajv();

/** */
class DBObject {
  static validate = ajv.compile(require('../schemas/DBObject.schema.json'));
  static allKeys:Array<string> = [];

  /**
   * @param {object} obj
   */
  constructor(obj: object) {
    let useobj = obj;
    switch (typeof (obj)) {
      case 'string':
        useobj = JSON.parse(obj);
        break;
      case 'object':
        break;
      default:
        useobj = {};
        break;
    };
    if (!DBObject.validate(useobj)) {
      throw DBObject.validate.errors;
    };
  };

  /**
   * @param {(...args: any[]) => any} func
   * @param {object} inSchema
   * @param {object} outSchema
   * @return {(...args: any[]) => any}
   */
  dbQuery(func: (...args: any[]) => any, inSchema:object={}, outSchema:object={}) {
    let instance = this;
    return function(...args: any[]) {
      let ret = withDBConnection(func)(...args);

      return ret;
    };
  }

  /**
   * @return {string}
   */
  toString() {
    return JSON.stringify(this, DBObject.allKeys);
  };
}

export default DBObject;
