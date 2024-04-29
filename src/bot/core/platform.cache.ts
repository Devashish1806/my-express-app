import { Logger } from "../../utils/log4js.util";
import { PlatformBot } from "./platform.bot";

export class PlatformCache {
  private static __instance: PlatformCache = null;
  private botCache: Map<string, PlatformBot>;

  constructor() {
    this.botCache = new Map<string, PlatformBot>();
  }

  public static getInstance(): PlatformCache {
    if (PlatformCache.__instance === null) {
      PlatformCache.__instance = new PlatformCache();
    }
    return PlatformCache.__instance;
  }

  public addBot(bot: PlatformBot) {
    this.botCache.set(bot.botId, bot);
    Logger.log.debug(
      `Bot [${bot.botId}] added to the platform cache successfully`
    );
  }

  public getBot(botId: string) {
    return this.botCache.get(botId);
  }
}
