import { BotState, MessageFactory } from "botbuilder";
import { Dialog } from "botbuilder-dialogs";
import { PlatformBaseBot } from "../platfrom.base-bot";

export class PlatformCoreBot extends PlatformBaseBot {
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
    super(botId, conversationState, userState, dialog);
  }
}
