const env = require('../utils/env');
import * as mongodb from 'mongodb';

/** */
class DBContext {
  static uri = 'mongodb://' + env.DB_USER + ':' + env.DB_PASSWORD +
    '@' + env.DB_HOST + ':' + env.DB_PORT;
  client;
  db;

  /** */
  constructor() {
    this.client = new mongodb.MongoClient(DBContext.uri);
  };

  /**
   * @return {Promise<void>}
   */
  async connect() {
    await this.client.connect();
    this.db = this.client.db(env.DB_DATABASE);
  };

  /**
   * @return {Promise<void>}
   */
  async disconnect() {
    await this.client.close();
  }

  /**
   * @param  {(any[])} func
   * @return {(any[])}
   */
  withConnection(func) {
    const instance = this;
    return async function(...args) {
      await instance.connect();
      const ret = func(...args);
      await instance.disconnect();
      return ret;
    };
  }

  /** */
  dbInitialize() {
    instance.connect();
    this.db.createCollection('items');
    this.db.createCollection('resources');
    this.db.listCollections();

    instance.disconnect();
  }
}

const instance = new DBContext();

module.exports = instance;
