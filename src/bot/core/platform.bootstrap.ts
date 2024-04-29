import {
  ConfigurationBotFrameworkAuthentication,
  ConfigurationBotFrameworkAuthenticationOptions,
  ConversationState,
  MemoryStorage,
  UserState,
} from "botbuilder";
import { PlatformAdapter } from "./platform.adapter";
import { PlatformBot } from "./platform.bot";
import { DialogHub } from "./platform.dialoghub";
import { PlatformCache } from "./platform.cache";
import { Logger } from "../../utils/log4js.util";
import { AppContext } from "../../app/app.context";

export class PlatformBootstrap {
  public async init(botId: string) {
    // Define a state store for your bot. See https://aka.ms/about-bot-state to learn more about using MemoryStorage.
    // A bot requires a state store to persist the dialog and user state between messages.
    let conversationState: ConversationState;
    let userState: UserState;

    // For local development, in-memory storage is used.
    // CAUTION: The Memory Storage used here is for local bot debugging only. When the bot
    // is restarted, anything stored in memory will be gone.
    const memoryStorage = new MemoryStorage();
    conversationState = new ConversationState(memoryStorage);
    userState = new UserState(memoryStorage);

    // Create the main dialog.
    const dialog = await DialogHub.getMainDialog(botId);

    // Create Bot
    const bot = new PlatformBot(conversationState, userState, dialog);

    // Attach adapter
    bot.adapter = this.createPlatformAdapter(botId);

    // Attach botId
    bot.botId = botId;

    // add bot to platform cache
    PlatformCache.getInstance().addBot(bot);

    Logger.log.debug(`Bot: [${botId}] setup completed`);
  }

  private createPlatformAdapter(botId: string): PlatformAdapter {
    const botFrameworkAuthentication =
      new ConfigurationBotFrameworkAuthentication(
        AppContext.config.bot[
          botId
        ] as ConfigurationBotFrameworkAuthenticationOptions
      );
    const adapter: PlatformAdapter = new PlatformAdapter(
      botFrameworkAuthentication
    );
    return adapter;
  }
}
