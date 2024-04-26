import { Request, Response } from "express";
import { BotService } from "./bot.service";
export class BotController {
  private static __instance: BotController = null;
  private __service: BotService = null;

  private constructor() {
    this.__service = BotService.getInstance();
  }

  public static getInstance(): BotController {
    if (BotController.__instance === null) {
      BotController.__instance = new BotController();
    }
    return BotController.__instance;
  }

  public async action(req: Request, res: Response) {
    return this.__service.action().then((result) => {
      res.send(result);
    });
  }
}
