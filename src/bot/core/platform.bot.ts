import {
  ActivityHandler,
  BotState,
  ConversationState,
  StatePropertyAccessor,
  UserState,
} from "botbuilder";
import { Dialog, DialogState } from "botbuilder-dialogs";
import { MainDialog } from "../dialogs/main.dialog";
import { PlatformAdapter } from "./platform.adapter";
import { Logger } from "../../utils/log4js.util";

export class PlatformBot extends ActivityHandler {
  private conversationState: BotState;
  private userState: BotState;
  private dialog: Dialog;
  private dialogState: StatePropertyAccessor<DialogState>;
  private __adapter: PlatformAdapter;
  private __botId: string;

  /**
   *
   * @param {BotState} conversationState
   * @param {BotState} userState
   * @param {Dialog} dialog
   */
  constructor(
    conversationState: BotState,
    userState: BotState,
    dialog: Dialog
  ) {
    super();
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

    this.conversationState = conversationState as ConversationState;
    this.userState = userState as UserState;
    this.dialog = dialog;
    this.dialogState =
      this.conversationState.createProperty<DialogState>("DialogState");

    this.onMessage(async (context, next) => {
      Logger.log.debug("Running dialog with Message Activity.");

      // Run the Dialog with the new message Activity.
      await (this.dialog as MainDialog).run(context, this.dialogState);

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
   * set adapter
   */
  set botId(botId: string) {
    this.__botId = botId;
  }

  /**
   * get adapter
   */
  get botId(): string {
    return this.__botId;
  }
}
