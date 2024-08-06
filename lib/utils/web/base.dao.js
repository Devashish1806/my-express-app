"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDao = void 0;
const mongodb_1 = require("mongodb");
const log4js_util_1 = require("../log4js.util");
const app_context_1 = require("../../app/app.context");
class BaseDao {
    constructor(collection) {
        this.collection = collection;
    }
    static getDBConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (BaseDao.dbConnection)
                return BaseDao.dbConnection;
            let client;
            try {
                client = yield mongodb_1.MongoClient.connect("mongodb://localhost:27017");
                BaseDao.dbConnection = client.db(app_context_1.AppContext.config.application.db);
                return BaseDao.dbConnection;
            }
            catch (error) {
                log4js_util_1.Logger.log.error(`Error while establishing DB connection`, error);
                return error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let db = yield BaseDao.getDBConnection();
            try {
                let result = yield db.collection(this.collection).find().toArray();
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
    aggregate(pipeline) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = yield BaseDao.getDBConnection();
            try {
                let result = yield db
                    .collection(this.collection)
                    .aggregate(pipeline)
                    .toArray();
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
    add(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = yield BaseDao.getDBConnection();
            try {
                let result = yield db.collection(this.collection).insertOne(payload);
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.BaseDao = BaseDao;
//# sourceMappingURL=base.dao.js.map