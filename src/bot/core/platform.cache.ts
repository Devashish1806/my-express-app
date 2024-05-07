import { Logger } from "../../utils/log4js.util";
import { PlatformBaseBot } from "./platfrom.base-bot";

export class PlatformCache {
  private static __instance: PlatformCache = null;
  private botCache: Map<string, PlatformBaseBot>;

  constructor() {
    this.botCache = new Map<string, PlatformBaseBot>();
  }

  public static getInstance(): PlatformCache {
    if (PlatformCache.__instance === null) {
      PlatformCache.__instance = new PlatformCache();
    }
    return PlatformCache.__instance;
  }

  public addBot(bot: PlatformBaseBot) {
    this.botCache.set(bot.botId, bot);
    Logger.log.debug(
      `Bot [${bot.botId}] added to the platform cache successfully`
    );
  }

  public getBot(botId: string) {
    return this.botCache.get(botId);
  }
}
