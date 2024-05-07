import {
  BotState,
  MessageFactory,
  StatePropertyAccessor,
  TurnContext,
} from "botbuilder";
import { Dialog, DialogState } from "botbuilder-dialogs";
import { PlatformBaseBot } from "../platfrom.base-bot";

export class PlatfromEchoBot extends PlatformBaseBot {
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
    super.onMessageHandler = this.messageHandler;
    super.onMembersAddedHandler = this.membersAddedHandler;
  }

  async messageHandler(
    context: TurnContext,
    dialog: Dialog,
    dialogState: StatePropertyAccessor<DialogState>
  ) {
    const replyText = `Echo: ${context.activity.text}`;
    await context.sendActivity(MessageFactory.text(replyText, replyText));
  }

  async membersAddedHandler(context: TurnContext) {
    const membersAdded = context.activity.membersAdded;
    const welcomeText = "Hello from PLATFROM ECHO BOT\n\nWelcome!";
    for (const member of membersAdded) {
      if (member.id !== context.activity.recipient.id) {
        await context.sendActivity(
          MessageFactory.text(welcomeText, welcomeText)
        );
      }
    }
  }
}
