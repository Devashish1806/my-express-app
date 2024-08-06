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
exports.AdminController = void 0;
const base_controller_1 = require("../utils/web/base.controller");
const admin_dao_1 = require("./admin.dao");
class AdminController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.__dao = admin_dao_1.AdminDao.getInstance();
    }
    static getInstance() {
        if (AdminController.__instance == null) {
            AdminController.__instance = new AdminController();
        }
        return AdminController.__instance;
    }
    action(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.__dao.action().then((result) => {
                res.send(result);
            });
        });
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map