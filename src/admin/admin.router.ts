import { Router, Request, Response } from "express";
import { BaseRouter } from "../utils/web/base.router";
import { Module } from "../utils/application.enums";
import { UserRouter } from "./user/user.router";
import { AdminController } from "./admin.controller";

export class AdminRouter extends BaseRouter {
  constructor() {
    super(Module.ADMIN);
  }

  onInit(router: Router) {
    router.get("/action", this.action);
    router.use("/user", UserRouter.getNewInstance());
  }

  public action(req: Request, res: Response) {
    return AdminController.getInstance().action(req, res);
  }
}
