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
exports.BotRouter = void 0;
const app_enums_1 = require("../app/app.enums");
const base_router_1 = require("../utils/web/base.router");
const bot_controller_1 = require("./bot.controller");
class BotRouter extends base_router_1.BaseRouter {
    constructor() {
        super(app_enums_1.Module.BOT);
    }
    listen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return bot_controller_1.BotController.listen(req, res);
        });
    }
    onInit(router) {
        router.post("/messages/:id", this.listen);
    }
}
exports.BotRouter = BotRouter;
//# sourceMappingURL=bot.router.js.map