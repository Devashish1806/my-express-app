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

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      const welcomeText = "Hello from PLATFROM CORE BOT\n\nwelcome!";
      for (const member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity(
            MessageFactory.text(welcomeText, welcomeText)
          );
        }
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}
