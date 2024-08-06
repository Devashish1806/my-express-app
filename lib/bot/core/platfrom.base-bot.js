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
exports.PlatformBaseBot = void 0;
const botbuilder_1 = require("botbuilder");
const log4js_util_1 = require("../../utils/log4js.util");
class PlatformBaseBot extends botbuilder_1.ActivityHandler {
    /**
     *
     * @param {BotState} conversationState
     * @param {BotState} userState
     * @param {Dialog} dialog
     */
    constructor(botId, conversationState, userState, dialog) {
        super();
        // setting up default base functionality
        if (!conversationState) {
            throw new Error("[DialogBot]: Missing parameter. conversationState is required");
        }
        if (!userState) {
            throw new Error("[DialogBot]: Missing parameter. userState is required");
        }
        if (!dialog) {
            throw new Error("[DialogBot]: Missing parameter. dialog is required");
        }
        if (!this.onMessageHandler) {
            this.onMessageHandler = (context, dialog, dialogState) => __awaiter(this, void 0, void 0, function* () {
                log4js_util_1.Logger.log.debug(`Running bot [${botId}] dialog with Message Activity.`);
                // Run the Dialog with the new message Activity.
                yield dialog.run(context, dialogState);
            });
        }
        if (!this.onMembersAddedHandler) {
            this.onMembersAddedHandler = (context) => __awaiter(this, void 0, void 0, function* () {
                const membersAdded = context.activity.membersAdded;
                const welcomeText = "Hello from PLATFROM BASE BOT\n\nWelcome!";
                for (const member of membersAdded) {
                    if (member.id !== context.activity.recipient.id) {
                        yield context.sendActivity(botbuilder_1.MessageFactory.text(welcomeText, welcomeText));
                    }
                }
            });
        }
        // default functionality completed
        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState =
            this.conversationState.createProperty("DialogState");
        this.onMessage((context, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.onMessageHandler(context, this.dialog, this.dialogState);
            // By calling next() you ensure that the next BotHandler is run.
            yield next();
        }));
        this.onMembersAdded((context, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.onMembersAddedHandler(context);
            // By calling next() you ensure that the next BotHandler is run.
            yield next();
        }));
        // this.onDialog(async (context, next) => {
        //   // Save any state changes. The load happened during the execution of the Dialog.
        //   await this.conversationState.saveChanges(context, false);
        //   await this.userState.saveChanges(context, false);
        //   Logger.log.debug(
        //     "[STATES UPDATED]",
        //     this.conversationState,
        //     this.userState
        //   );
        //   // By calling next() you ensure that the next BotHandler is run.
        //   await next();
        // });
    }
    /**
     * Override the ActivityHandler.run() method to save state changes after the bot logic completes.
     */
    run(context) {
        const _super = Object.create(null, {
            run: { get: () => super.run }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.run.call(this, context);
            // Save any state changes. The load happened during the execution of the Dialog.
            yield this.conversationState.saveChanges(context, false);
            yield this.userState.saveChanges(context, false);
            // Logger.log.debug(
            //   "[STATES UPDATED]",
            //   this.conversationState,
            //   this.userState
            // );
        });
    }
    /**
     * set adapter
     */
    set adapter(adapter) {
        this.__adapter = adapter;
    }
    /**
     * get adapter
     */
    get adapter() {
        return this.__adapter;
    }
    /**
     * set botId
     */
    set botId(botId) {
        this.__botId = botId;
    }
    /**
     * get botId
     */
    get botId() {
        return this.__botId;
    }
    /**
     * set botName
     */
    set botName(botId) {
        this.__botName = botId;
    }
    /**
     * get botId
     */
    get botName() {
        return this.__botName;
    }
    /**
     * set on message handler
     */
    set onMessageHandler(handler) {
        this.__messageHandler = handler;
    }
    /**
     * get on message handler
     */
    get onMessageHandler() {
        return this.__messageHandler;
    }
    /**
     * set on message handler
     */
    set onMembersAddedHandler(handler) {
        this.__membersAddedHandler = handler;
    }
    /**
     * get on message handler
     */
    get onMembersAddedHandler() {
        return this.__membersAddedHandler;
    }
}
exports.PlatformBaseBot = PlatformBaseBot;
//# sourceMappingURL=platfrom.base-bot.js.map