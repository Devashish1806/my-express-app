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
exports.UserController = void 0;
const user_dao_1 = require("./user.dao");
class UserController {
    constructor() {
        this.__dao = user_dao_1.UserDao.getInstance();
    }
    static getInstance() {
        if (UserController.__instance == null) {
            UserController.__instance = new UserController();
        }
        return UserController.__instance;
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__dao.getUsers().then((user) => {
                res.send(user);
            });
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__dao.addUser(req.body).then((result) => {
                res.send(result);
            });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map