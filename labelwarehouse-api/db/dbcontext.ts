import env from '../utils/env';
import * as mongodb from 'mongodb';

/** */
class DBContext {
  static uri: string = 'mongodb+srv://' + env.DB_USER + ':' + env.DB_PASSWORD +
    '@' + env.DB_HOST + ':' + env.DB_PORT;
  client: mongodb.MongoClient;

  /** */
  constructor() {
    this.client = new mongodb.MongoClient(DBContext.uri);
  };

  /**
   * @return {mongodb.Db}
   */
  async connect() {
    await this.client.connect();
    return this.client.db(env.DB_DATABASE);
  };

  /** */
  async disconnect() {
    await this.client.close();
  }

  /**
   * @param  {(any[])} func
   * @return {(any[])}
   */
  withConnection(func: (...args: any[]) => any): (...args: any[]) => Promise<any> {
    let instance = this;
    return async function (...args) {
      await instance.connect();
      let ret = func(...args);
      await instance.disconnect();
      return ret;
    };
  }
}

let instance = new DBContext();

export default instance;
