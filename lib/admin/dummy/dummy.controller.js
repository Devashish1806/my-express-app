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
exports.DummyController = void 0;
const dummy_dao_1 = require("./dummy.dao");
class DummyController {
    constructor() {
        this.__dao = dummy_dao_1.DummyDao.getInstance();
    }
    static getInstance() {
        if (DummyController.__instance == null) {
            DummyController.__instance = new DummyController();
        }
        return DummyController.__instance;
    }
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__dao.getData(req.query).then((result) => {
                res.send(result);
            });
        });
    }
}
exports.DummyController = DummyController;
//# sourceMappingURL=dummy.controller.js.map