import { MongoClient, Db } from "mongodb";
import { Logger } from "../log4js.util";

export abstract class BaseDao {
  private static dbConnection: Db;

  constructor(private collection: string) {}

  public static async getDBConnection(): Promise<Db> {
    if (BaseDao.dbConnection) return BaseDao.dbConnection;

    let client: MongoClient;
    try {
      client = await MongoClient.connect("mongodb://localhost:27017");
      BaseDao.dbConnection = client.db("test");
      return BaseDao.dbConnection;
    } catch (error) {
      Logger.log.error(`Fetching records failed! `, error);
      return error;
    }
  }

  public async findAll(): Promise<any> {
    Logger.log.debug(`Find All: [${this.collection}]`);
    let db = await BaseDao.getDBConnection();
    try {
      let result = await db.collection(this.collection).find().toArray();
      return result;
    } catch (error) {
      Logger.log.error(`Fetching records failed! `, error);
      return error;
    }
  }
}
