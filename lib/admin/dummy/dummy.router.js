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
exports.DummyRouter = void 0;
const express_1 = require("express");
const dummy_controller_1 = require("./dummy.controller");
class DummyRouter {
    constructor() {
        DummyRouter.__router = (0, express_1.Router)();
    }
    static getInstance() {
        if (DummyRouter.__router === null) {
            new DummyRouter().init();
        }
        return DummyRouter.__router;
    }
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            dummy_controller_1.DummyController.getInstance().getData(req, res);
        });
    }
    init() {
        DummyRouter.__router.get("/", this.getData);
    }
}
exports.DummyRouter = DummyRouter;
DummyRouter.__router = null;
//# sourceMappingURL=dummy.router.js.map