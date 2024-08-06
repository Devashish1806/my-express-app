import { BotState, StatePropertyAccessor, TurnContext } from "botbuilder";
import { Dialog, DialogState } from "botbuilder-dialogs";
import { PlatformBaseBot } from "../platfrom.base-bot";
export declare class PlatfromEchoBot extends PlatformBaseBot {
    /**
     *
     * @param {BotState} conversationState
     * @param {BotState} userState
     * @param {Dialog} dialog
     */
    constructor(botId: string, conversationState: BotState, userState: BotState, dialog: Dialog);
    messageHandler(context: TurnContext, dialog: Dialog, dialogState: StatePropertyAccessor<DialogState>): Promise<void>;
    membersAddedHandler(context: TurnContext): Promise<void>;
}
