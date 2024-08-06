"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformCache = void 0;
const log4js_util_1 = require("../../utils/log4js.util");
class PlatformCache {
    constructor() {
        this.botCache = new Map();
    }
    static getInstance() {
        if (PlatformCache.__instance === null) {
            PlatformCache.__instance = new PlatformCache();
        }
        return PlatformCache.__instance;
    }
    addBot(bot) {
        this.botCache.set(bot.botId, bot);
        log4js_util_1.Logger.log.debug(`Bot [${bot.botId}] added to the platform cache successfully`);
    }
    getBot(botId) {
        return this.botCache.get(botId);
    }
}
exports.PlatformCache = PlatformCache;
PlatformCache.__instance = null;
//# sourceMappingURL=platform.cache.js.map