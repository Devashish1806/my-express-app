import { Logger } from "../../utils/log4js.util";
import { Router, Request, Response } from "express";
import { AdminController } from "../admin.controller";
import { UserController } from "./user.controller";

export class UserRouter {
  private static __router: Router = null;

  private constructor() {
    UserRouter.__router = Router();
  }

  public static getNewInstance(): Router {
    if (UserRouter.__router === null) {
      new UserRouter().init();
    }
    return UserRouter.__router;
  }

  public async getUsers(req: Request, res: Response) {
    UserController.getInstance().getUsers(req, res);
  }

  public async addUser(req: Request, res: Response) {
    UserController.getInstance().addUser(req, res);
  }

  init() {
    Logger.log.info("User route init triggered");
    UserRouter.__router.get("/", this.getUsers);
    UserRouter.__router.post("/", this.addUser);
  }
}
