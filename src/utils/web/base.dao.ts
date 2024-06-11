import { MongoClient, Db, Document } from "mongodb";
import { Logger } from "../log4js.util";
import { AppContext } from "../../app/app.context";

export abstract class BaseDao {
  private static dbConnection: Db;

  constructor(private collection: string) {}

  public static async getDBConnection(): Promise<Db> {
    if (BaseDao.dbConnection) return BaseDao.dbConnection;

    let client: MongoClient;
    try {
      client = await MongoClient.connect("mongodb://localhost:27017");
      BaseDao.dbConnection = client.db(AppContext.config.application.db);
      return BaseDao.dbConnection;
    } catch (error) {
      Logger.log.error(`Error while establishing DB connection`, error);
      return error;
    }
  }

  public async findAll(): Promise<any> {
    let db = await BaseDao.getDBConnection();
    try {
      let result = await db.collection(this.collection).find().toArray();
      return result;
    } catch (error) {
      return error;
    }
  }

  public async aggregate(pipeline: Array<Document>): Promise<any> {
    let db = await BaseDao.getDBConnection();
    try {
      let result = await db
        .collection(this.collection)
        .aggregate(pipeline)
        .toArray();
      return result;
    } catch (error) {
      return error;
    }
  }

  public async add(payload: any): Promise<any> {
    let db = await BaseDao.getDBConnection();
    try {
      let result = await db.collection(this.collection).insertOne(payload);
      return result;
    } catch (error) {
      return error;
    }
  }
}
