import { Logger } from "../utils/log4js.util";

export class BotService {
  private static __instance: BotService = null;

  public static getInstance(): BotService {
    if (BotService.__instance === null) {
      BotService.__instance = new BotService();
    }
    return BotService.__instance;
  }

  public async action() {
    // need to handle the bot listen event
    Logger.log.debug("Bot message action event triggered");
    return { status: 200, message: "Bot message action event triggered" };
  }
}
