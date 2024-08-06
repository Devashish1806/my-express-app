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
exports.AdminDao = void 0;
const base_dao_1 = require("../utils/web/base.dao");
class AdminDao extends base_dao_1.BaseDao {
    static getInstance() {
        if (AdminDao.__instance === null) {
            AdminDao.__instance = new AdminDao("admin");
        }
        return AdminDao.__instance;
    }
    action() {
        return __awaiter(this, void 0, void 0, function* () {
            return { error: "error in your request" };
        });
    }
}
exports.AdminDao = AdminDao;
AdminDao.__instance = null;
//# sourceMappingURL=admin.dao.js.map