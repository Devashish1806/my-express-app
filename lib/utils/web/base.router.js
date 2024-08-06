"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = require("express");
const log4js_util_1 = require("../log4js.util");
class BaseRouter {
    constructor(module) {
        this.module = module;
        this.router = (0, express_1.Router)();
        this.init();
    }
    init() {
        this.router.get("/health", this.healthCheck);
        log4js_util_1.Logger.log.debug(`BaseRouters ${this.module}`);
        this.onInit(this.router);
        return;
    }
    getRouter() {
        return this.router;
    }
    getBasePath() {
        const path = `/my-app/${this.module}`;
        log4js_util_1.Logger.log.debug(`Base path ${path}`);
        return path;
    }
    getModule() {
        return this.module;
    }
    healthCheck(req, res) {
        res.status(200).send(`Service is up and alive !!!`);
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=base.router.js.map