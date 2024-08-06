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
exports.BotController = void 0;
const log4js_util_1 = require("../utils/log4js.util");
const platform_cache_1 = require("./core/platform.cache");
class BotController {
    static listen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // bot listen event
            const platformBot = platform_cache_1.PlatformCache.getInstance().getBot(req.params.id);
            if (platformBot) {
                log4js_util_1.Logger.log.debug(`Bot [${platformBot.botId}] message action event triggered`);
                yield platformBot.adapter.processMessageActivity(req, res, (context) => platformBot.run(context));
            }
            else {
                let msg = `Bot [${req.params.id}] [NOT FOUND]`;
                res.status(404).send(msg);
                log4js_util_1.Logger.log.warn(msg);
            }
        });
    }
}
exports.BotController = BotController;
//# sourceMappingURL=bot.controller.js.map