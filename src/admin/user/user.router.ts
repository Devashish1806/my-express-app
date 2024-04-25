import { Logger } from "../../utils/log4js.util";
import { Router } from "express";

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

  init() {
    Logger.log.info("User route init triggered");
    UserRouter.__router.get("/", () => {
      Logger.log.log("User is trigerred");
    });
  }
}
