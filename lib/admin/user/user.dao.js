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
exports.UserDao = void 0;
const base_dao_1 = require("../../utils/web/base.dao");
class UserDao extends base_dao_1.BaseDao {
    constructor() {
        super("user");
    }
    static getInstance() {
        if (UserDao.__instance === null) {
            UserDao.__instance = new UserDao();
        }
        return UserDao.__instance;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findAll();
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.date = new Date();
            return this.add(user);
        });
    }
}
exports.UserDao = UserDao;
UserDao.__instance = null;
//# sourceMappingURL=user.dao.js.map