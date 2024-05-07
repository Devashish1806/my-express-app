import { Request, Response } from "express";
import { Logger } from "../utils/log4js.util";
import { PlatformCache } from "./core/platform.cache";
import { PlatformBaseBot } from "./core/platfrom.base-bot";

export class BotController {
  public static async listen(req: Request, res: Response) {
    // bot listen event
    const platformBot: PlatformBaseBot = PlatformCache.getInstance().getBot(
      req.params.id
    );
    if (platformBot) {
      Logger.log.debug(
        `Bot [${platformBot.botId}] message action event triggered`
      );
      await platformBot.adapter.processMessageActivity(req, res, (context) =>
        platformBot.run(context)
      );
    } else {
      let msg = `Bot [${req.params.id}] [NOT FOUND]`;
      res.status(404).send(msg);
      Logger.log.warn(msg);
    }
  }
}
