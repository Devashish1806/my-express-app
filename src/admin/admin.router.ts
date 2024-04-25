import { Router } from "express";
import { BaseRouter } from "../utils/web/base.router";
import { Module } from "../utils/application.enums";
import { UserRouter } from "./user/user.router";
import { Logger } from "../utils/log4js.util";

export class AdminRouter extends BaseRouter {
  constructor() {
    super(Module.ADMIN);
  }

  onInit(router: Router) {
    Logger.log.debug("Admin onInit")
    router.get("/", () => {
      Logger.log.info("adminnnn triggered");
      return;
    });
    router.use("/user", UserRouter.getNewInstance());
  }
}
