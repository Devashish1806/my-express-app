import { Request, Response } from "express";
import { Logger } from "../utils/log4js.util";
import { PlatformBot } from "./core/platform.bot";
import { PlatformCache } from "./core/platform.cache";

export class BotController {
  public static async listen(req: Request, res: Response) {
    // need to handle the bot listen event
    Logger.log.debug("Bot message action event triggered ");
    const platformBot: PlatformBot = PlatformCache.getInstance().getBot(
      req.params.id
    );
    res.send({
      status: 200,
      message: `Bot [${platformBot.botId}] message action event triggered`,
    });
  }
}
