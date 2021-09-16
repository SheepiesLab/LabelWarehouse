const env = require('../utils/env');
const mongodb = require('mongodb');

/**
 * @property {mongodb.MongoClient} client
 * @property {Promise<any>} connection
 * @property {mongodb.Db} db
 * @property {mongodb.Collection} collection
 */
class DBContext {
  static uri = 'mongodb://' + env.DB_USER + ':' + env.DB_PASSWORD +
    '@' + env.DB_HOST + ':' + env.DB_PORT + '/' + env.DB_DATABASE;
  client;
  connection;
  db;
  collection;

  /** */
  constructor() {
    this.client = new mongodb.MongoClient(DBContext.uri);
    this.connection = this.client.connect();
  };

  /**
   * @param {Function} func
   * @param {string} collection
   * @param {string} db
   * @return {Function}
   */
  withConnection(func, collection, db=env.DB_DATABASE) {
    const ins = this;
    return async (...args) => {
      await ins.connection;
      ins.db = ins.client.db(db);
      ins.collection = ins.db.collection(collection);
      const ret = await func(...args);
      ins.db = undefined;
      ins.collection = undefined;
      return ret;
    };
  }

  /**
   * @return {Promise<void>}
   */
  async disconnect() {
    await this.client.close();
  }
}

const instance = new DBContext();

module.exports = instance;
