import {
  ActivityHandler,
  BotState,
  ConversationState,
  MessageFactory,
  StatePropertyAccessor,
  TurnContext,
  UserState,
} from "botbuilder";
import { Dialog, DialogState } from "botbuilder-dialogs";
import { MainDialog } from "../dialogs/main.dialog";
import { PlatformAdapter } from "./platform.adapter";
import { Logger } from "../../utils/log4js.util";

export abstract class PlatformBaseBot extends ActivityHandler {
  private conversationState: BotState;
  private userState: BotState;
  private dialog: Dialog;
  private dialogState: StatePropertyAccessor<DialogState>;
  private __adapter: PlatformAdapter;
  private __botId: string;
  private __botName: string;
  private __messageHandler: (
    context: TurnContext,
    dialog: Dialog,
    dialogState: StatePropertyAccessor<DialogState>
  ) => Promise<void>;
  private __membersAddedHandler: (context: TurnContext) => Promise<void>;

  /**
   *
   * @param {BotState} conversationState
   * @param {BotState} userState
   * @param {Dialog} dialog
   */
  constructor(
    botId: string,
    conversationState: BotState,
    userState: BotState,
    dialog: Dialog
  ) {
    super();
    // setting up default base functionality
    if (!conversationState) {
      throw new Error(
        "[DialogBot]: Missing parameter. conversationState is required"
      );
    }
    if (!userState) {
      throw new Error("[DialogBot]: Missing parameter. userState is required");
    }
    if (!dialog) {
      throw new Error("[DialogBot]: Missing parameter. dialog is required");
    }
    if (!this.onMessageHandler) {
      this.onMessageHandler = async (context, dialog, dialogState) => {
        Logger.log.debug(
          `Running bot [${botId}] dialog with Message Activity.`
        );
        // Run the Dialog with the new message Activity.
        await (dialog as MainDialog).run(context, dialogState);
      };
    }
    if (!this.onMembersAddedHandler) {
      this.onMembersAddedHandler = async (context) => {
        const membersAdded = context.activity.membersAdded;
        const welcomeText = "Hello from PLATFROM BASE BOT\n\nWelcome!";
        for (const member of membersAdded) {
          if (member.id !== context.activity.recipient.id) {
            await context.sendActivity(
              MessageFactory.text(welcomeText, welcomeText)
            );
          }
        }
      };
    }
    // default functionality completed

    this.conversationState = conversationState as ConversationState;
    this.userState = userState as UserState;
    this.dialog = dialog;
    this.dialogState =
      this.conversationState.createProperty<DialogState>("DialogState");

    this.onMessage(async (context, next) => {
      await this.onMessageHandler(context, this.dialog, this.dialogState);
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      await this.onMembersAddedHandler(context);
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

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
  public async run(context): Promise<void> {
    await super.run(context);
    // Save any state changes. The load happened during the execution of the Dialog.
    await this.conversationState.saveChanges(context, false);
    await this.userState.saveChanges(context, false);
    // Logger.log.debug(
    //   "[STATES UPDATED]",
    //   this.conversationState,
    //   this.userState
    // );
  }

  /**
   * set adapter
   */
  set adapter(adapter: PlatformAdapter) {
    this.__adapter = adapter;
  }

  /**
   * get adapter
   */
  get adapter(): PlatformAdapter {
    return this.__adapter;
  }

  /**
   * set botId
   */
  set botId(botId: string) {
    this.__botId = botId;
  }

  /**
   * get botId
   */
  get botId(): string {
    return this.__botId;
  }

  /**
   * set botName
   */
  set botName(botId: string) {
    this.__botName = botId;
  }

  /**
   * get botId
   */
  get botName(): string {
    return this.__botName;
  }

  /**
   * set on message handler
   */
  set onMessageHandler(
    handler: (
      context: TurnContext,
      dialog: Dialog,
      dialogState: StatePropertyAccessor<DialogState>
    ) => Promise<void>
  ) {
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
  set onMembersAddedHandler(handler: (context: TurnContext) => Promise<void>) {
    this.__membersAddedHandler = handler;
  }

  /**
   * get on message handler
   */
  get onMembersAddedHandler() {
    return this.__membersAddedHandler;
  }
}
