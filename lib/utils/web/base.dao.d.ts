import { Db, Document } from "mongodb";
export declare abstract class BaseDao {
    private collection;
    private static dbConnection;
    constructor(collection: string);
    static getDBConnection(): Promise<Db>;
    findAll(): Promise<any>;
    aggregate(pipeline: Array<Document>): Promise<any>;
    add(payload: any): Promise<any>;
}
