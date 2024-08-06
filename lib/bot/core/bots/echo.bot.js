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
exports.PlatfromEchoBot = void 0;
const botbuilder_1 = require("botbuilder");
const platfrom_base_bot_1 = require("../platfrom.base-bot");
class PlatfromEchoBot extends platfrom_base_bot_1.PlatformBaseBot {
    /**
     *
     * @param {BotState} conversationState
     * @param {BotState} userState
     * @param {Dialog} dialog
     */
    constructor(botId, conversationState, userState, dialog) {
        super(botId, conversationState, userState, dialog);
        super.onMessageHandler = this.messageHandler;
        super.onMembersAddedHandler = this.membersAddedHandler;
    }
    messageHandler(context, dialog, dialogState) {
        return __awaiter(this, void 0, void 0, function* () {
            const replyText = `Echo: ${context.activity.text}`;
            yield context.sendActivity(botbuilder_1.MessageFactory.text(replyText, replyText));
        });
    }
    membersAddedHandler(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = "Hello from PLATFROM ECHO BOT\n\nWelcome!";
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    yield context.sendActivity(botbuilder_1.MessageFactory.text(welcomeText, welcomeText));
                }
            }
        });
    }
}
exports.PlatfromEchoBot = PlatfromEchoBot;
//# sourceMappingURL=echo.bot.js.map