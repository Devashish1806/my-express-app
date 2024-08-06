"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformLiveAgentBot = void 0;
const platfrom_base_bot_1 = require("../platfrom.base-bot");
class PlatformLiveAgentBot extends platfrom_base_bot_1.PlatformBaseBot {
    /**
     *
     * @param {BotState} conversationState
     * @param {BotState} userState
     * @param {Dialog} dialog
     */
    constructor(botId, conversationState, userState, dialog) {
        super(botId, conversationState, userState, dialog);
    }
}
exports.PlatformLiveAgentBot = PlatformLiveAgentBot;
//# sourceMappingURL=liveagent.bot.js.map