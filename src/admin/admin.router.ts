import { Router, Request, Response } from "express";
import { BaseRouter } from "../utils/web/base.router";
import { Module } from "../app/app.enums";
import { UserRouter } from "./user/user.router";
import { AdminController } from "./admin.controller";
import { DummyRouter } from "./dummy/dummy.router";

export class AdminRouter extends BaseRouter {
  constructor() {
    super(Module.ADMIN);
  }

  onInit(router: Router) {
    router.get("/action", this.action);
    router.use("/user", UserRouter.getInstance());
    router.use("/dummy", DummyRouter.getInstance());
  }

  public action(req: Request, res: Response) {
    return AdminController.getInstance().action(req, res);
  }
}
