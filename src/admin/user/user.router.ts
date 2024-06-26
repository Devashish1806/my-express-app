import { Router, Request, Response } from "express";
import { UserController } from "./user.controller";

export class UserRouter {
  private static __router: Router = null;

  private constructor() {
    UserRouter.__router = Router();
  }

  public static getInstance(): Router {
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
    UserRouter.__router.get("/", this.getUsers);
    UserRouter.__router.post("/", this.addUser);
  }
}
