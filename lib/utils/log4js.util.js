"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const log4js_1 = require("log4js");
const app_context_1 = require("../app/app.context");
class Logger {
    static createLogger() {
        const logger = (0, log4js_1.getLogger)();
        (0, log4js_1.configure)(app_context_1.AppContext.config.log4js);
        return logger;
    }
}
exports.Logger = Logger;
Logger.log = Logger.createLogger();
//# sourceMappingURL=log4js.util.js.map