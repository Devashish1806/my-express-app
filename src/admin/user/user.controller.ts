import { UserDao } from "./user.dao";
import { Request, Response } from "express";

export class UserController {
  private static __instance: UserController;
  private __dao: UserDao;

  private constructor() {
    this.__dao = UserDao.getInstance();
  }

  public static getInstance() {
    if (UserController.__instance == null) {
      UserController.__instance = new UserController();
    }
    return UserController.__instance;
  }

  public async getUsers(req: Request, res: Response): Promise<any> {
    this.__dao.getUsers().then((user) => {
      res.send(user);
    });
  }

  public async addUser(req: Request, res: Response): Promise<any> {
    this.__dao.addUser(req.body).then((result) => {
      res.send(result);
    });
  }
}
