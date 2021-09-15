const env = require('../utils/env');
const mongodb = require('mongodb');

/** */
class DBContext {
  static uri = 'mongodb://' + env.DB_USER + ':' + env.DB_PASSWORD +
    '@' + env.DB_HOST + ':' + env.DB_PORT + '/' + env.DB_DATABASE;
  static requiredCollections = ['items', 'resources'];
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
  async dbInitialize() {
    await instance.connect();
    const requiredCollectionExists =
      DBContext.requiredCollections.reduce((map, item) => {
        map[item] = false;
        return map;
      }, {});
    const collections = await this.db.listCollections().toArray();
    collections.map((o) => {
      requiredCollectionExists[o.name] = true;
    });
    for (const key in requiredCollectionExists) {
      if (!requiredCollectionExists[key]) {
        await this.db.createCollection(key);
      }
    }
    await instance.disconnect();
  }
}

const instance = new DBContext();

module.exports = instance;
