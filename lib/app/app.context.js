"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContext = void 0;
const app_parser_1 = require("./app.parser");
class AppContext {
    constructor() {
        this.__parserInstance = null;
        this.__parserInstance = app_parser_1.AppParser.getInstance();
    }
    static getInstance() {
        if (AppContext.__instance === null) {
            AppContext.__instance = new AppContext();
            Object.freeze(AppContext.__instance);
        }
        return AppContext.__instance;
    }
    static get config() {
        return this.getInstance().__parserInstance.config;
    }
    static get languageTemplate() {
        return this.getInstance().__parserInstance.languageTemplate;
    }
    static get modules() {
        return this.getInstance().__parserInstance.config.modules;
    }
}
exports.AppContext = AppContext;
AppContext.__instance = null;
//# sourceMappingURL=app.context.js.map