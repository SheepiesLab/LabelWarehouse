const env = require('../utils/env');
const MongoClient = require('mongodb').MongoClient;

/** */
class DBContext {
  /** */
  constructor() {
    this.uri = 'mongodb+srv://' + env.DB_USER + ':' + env.DB_PASSWORD + '@' + env.DB_HOST + '?retryWrites=true&writeConcern=majority';
    this.client = new MongoClient(uri);
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
}

module.exports = DBContext;
