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
exports.PlatformBootstrap = void 0;
const botbuilder_1 = require("botbuilder");
const platform_adapter_1 = require("./platform.adapter");
const core_bot_1 = require("./bots/core.bot");
const platform_dialoghub_1 = require("./platform.dialoghub");
const platform_cache_1 = require("./platform.cache");
const log4js_util_1 = require("../../utils/log4js.util");
const app_context_1 = require("../../app/app.context");
const echo_bot_1 = require("./bots/echo.bot");
const liveagent_bot_1 = require("./bots/liveagent.bot");
class PlatformBootstrap {
    init(botConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            // Define a state store for your bot. See https://aka.ms/about-bot-state to learn more about using MemoryStorage.
            // A bot requires a state store to persist the dialog and user state between messages.
            let conversationState;
            let userState;
            // For local development, in-memory storage is used.
            // CAUTION: The Memory Storage used here is for local bot debugging only. When the bot
            // is restarted, anything stored in memory will be gone.
            const memoryStorage = new botbuilder_1.MemoryStorage();
            conversationState = new botbuilder_1.ConversationState(memoryStorage);
            userState = new botbuilder_1.UserState(memoryStorage);
            // Create the main dialog.
            const dialog = yield platform_dialoghub_1.DialogHub.getMainDialog(botConfig.id);
            // Create Bot
            let bot;
            switch (botConfig.type) {
                case "core":
                    bot = new core_bot_1.PlatformCoreBot(botConfig.id, conversationState, userState, dialog);
                    break;
                case "liveagent":
                    bot = new liveagent_bot_1.PlatformLiveAgentBot(botConfig.id, conversationState, userState, dialog);
                    break;
                default:
                    bot = new echo_bot_1.PlatfromEchoBot(botConfig.id, conversationState, userState, dialog);
                    break;
            }
            // Attach adapter
            bot.adapter = this.createPlatformAdapter(botConfig.id);
            // Attach botId & name
            bot.botId = botConfig.id;
            bot.botName = botConfig.name;
            // add bot to platform cache
            platform_cache_1.PlatformCache.getInstance().addBot(bot);
            log4js_util_1.Logger.log.debug(`Bot: [${botConfig.id}] setup completed`);
        });
    }
    createPlatformAdapter(botId) {
        const botFrameworkAuthentication = new botbuilder_1.ConfigurationBotFrameworkAuthentication(app_context_1.AppContext.config.bot[botId]);
        const adapter = new platform_adapter_1.PlatformAdapter(botFrameworkAuthentication);
        return adapter;
    }
}
exports.PlatformBootstrap = PlatformBootstrap;
//# sourceMappingURL=platform.bootstrap.js.map