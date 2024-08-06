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
exports.DialogHub = void 0;
const app_context_1 = require("../../app/app.context");
const log4js_util_1 = require("../../utils/log4js.util");
const liveagent_dialog_1 = require("../dialogs/componentDialogs/liveagent.dialog");
const welcome_dialog_1 = require("../dialogs/componentDialogs/welcome.dialog");
const main_dialog_1 = require("../dialogs/main.dialog");
const platform_recognizer_1 = require("./recognizer/platform.recognizer");
class DialogHub {
    static getDialogs() {
        if (!DialogHub.__dialogCache) {
            DialogHub.__dialogCache = new Map();
            DialogHub.__dialogCache.set("welcome.dialog", new welcome_dialog_1.WelcomeDialog("welcome.dialog"));
            DialogHub.__dialogCache.set("liveagent.dialog", new liveagent_dialog_1.LiveagentDialog("liveagent.dialog"));
        }
        return DialogHub.__dialogCache;
    }
    static getMainDialog(botId) {
        return __awaiter(this, void 0, void 0, function* () {
            const recognizer = new platform_recognizer_1.PlatformRecognizer(botId);
            const dialogs = [];
            const intents = app_context_1.AppContext.config.dialogs[botId].intents;
            for (let intent in intents) {
                const dialog = DialogHub.getDialogs().get(intents[intent]);
                if (dialog) {
                    log4js_util_1.Logger.log.debug(`Bot: [${botId}] [DIALOG FOUND] ${intents[intent]}`);
                    dialogs.push(dialog.getNewInstance());
                }
                else {
                    log4js_util_1.Logger.log.warn(`Bot: [${botId}] [DIALOG NOT FOUND] ${intents[intent]}`);
                }
            }
            return new main_dialog_1.MainDialog(`${botId}.main.dialog`, dialogs, recognizer);
        });
    }
}
exports.DialogHub = DialogHub;
DialogHub.__dialogCache = null;
//# sourceMappingURL=platform.dialoghub.js.map