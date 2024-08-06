import { ActivityHandler, BotState, StatePropertyAccessor, TurnContext } from "botbuilder";
import { Dialog, DialogState } from "botbuilder-dialogs";
import { PlatformAdapter } from "./platform.adapter";
export declare abstract class PlatformBaseBot extends ActivityHandler {
    private conversationState;
    private userState;
    private dialog;
    private dialogState;
    private __adapter;
    private __botId;
    private __botName;
    private __messageHandler;
    private __membersAddedHandler;
    /**
     *
     * @param {BotState} conversationState
     * @param {BotState} userState
     * @param {Dialog} dialog
     */
    constructor(botId: string, conversationState: BotState, userState: BotState, dialog: Dialog);
    /**
     * Override the ActivityHandler.run() method to save state changes after the bot logic completes.
     */
    run(context: any): Promise<void>;
    /**
     * set adapter
     */
    set adapter(adapter: PlatformAdapter);
    /**
     * get adapter
     */
    get adapter(): PlatformAdapter;
    /**
     * set botId
     */
    set botId(botId: string);
    /**
     * get botId
     */
    get botId(): string;
    /**
     * set botName
     */
    set botName(botId: string);
    /**
     * get botId
     */
    get botName(): string;
    /**
     * set on message handler
     */
    set onMessageHandler(handler: (context: TurnContext, dialog: Dialog, dialogState: StatePropertyAccessor<DialogState>) => Promise<void>);
    /**
     * get on message handler
     */
    get onMessageHandler(): (context: TurnContext, dialog: Dialog, dialogState: StatePropertyAccessor<DialogState>) => Promise<void>;
    /**
     * set on message handler
     */
    set onMembersAddedHandler(handler: (context: TurnContext) => Promise<void>);
    /**
     * get on message handler
     */
    get onMembersAddedHandler(): (context: TurnContext) => Promise<void>;
}
