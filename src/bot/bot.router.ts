import { Router, Request, Response } from "express";
import { Module } from "../utils/application.enums";
import { BaseRouter } from "../utils/web/base.router";
import { BotController } from "./bot.controller";

export class BotRouter extends BaseRouter {
  constructor() {
    super(Module.BOT);
  }

  public async listen(req: Request, res: Response) {
    return BotController.listen(req, res);
  }

  onInit(router: Router) {
    router.post("/messages/:id", this.listen);
  }
}
