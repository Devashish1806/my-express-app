import { Request, Response } from "express";
import { Logger } from "../utils/log4js.util";
import { PlatformBot } from "./core/platform.bot";
import { PlatformCache } from "./core/platform.cache";

export class BotController {
  public static async listen(req: Request, res: Response) {
    // bot listen event
    const platformBot: PlatformBot = PlatformCache.getInstance().getBot(
      req.params.id
    );
    if (PlatformBot) {
      Logger.log.debug(
        `Bot [${platformBot.botId}] message action event triggered`
      );
      await platformBot.adapter.processMessageActivity(req, res, (context) =>
        platformBot.run(context)
      );
    } else {
      throw new Error(`Bot [${req.params.id}] [NOT FOUND]`);
    }
  }
}
