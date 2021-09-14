const env = require('../utils/env');
const MongoClient = require('mongodb').MongoClient;

/** */
class DBContext {
  static uri = 'mongodb+srv://' + env.DB_USER + ':' + env.DB_PASSWORD +
    '@' + env.DB_HOST + ':' + env.DB_PORT;
  /** */
  constructor() {
    this.client = new MongoClient(this.uri);
  };

  /** */
  async connect() {
    await this.client.connect();
    this.database = this.client.db(env.DB_DATABASE);
  };

  /** */
  async disconnect() {
    await this.client.close();
  }

  /**
   * @param  {Function} func
   * @return {Function}
   */
  withConnection(func) {
    instance = this;
    return async function(...args) {
      await instance.connect();
      ret = func(instance.client, ...args);
      await instance.disconnect();
    };
  }
}

instance = new DBContext();

module.exports = instance;
