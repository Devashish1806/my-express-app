import { Router } from "express";
import { Module } from "../utils/application.enums";
import { BaseRouter } from "../utils/web/base.router";

export class BotRouter extends BaseRouter {
  constructor() {
    super(Module.BOT);
  }

  onInit(router: Router) {
    router.post("");
  }
}
