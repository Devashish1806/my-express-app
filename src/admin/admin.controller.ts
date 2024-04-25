import { BaseController } from "../utils/web/base.controller";
import { Request, Response } from "express";
import { AdminDao } from "./admin.dao";

export class AdminController extends BaseController {
  private static __instance: AdminController;
  private __dao: AdminDao;

  private constructor() {
    super();
    this.__dao = AdminDao.getNewInstance();
  }

  public static getInstance() {
    if (AdminController.__instance == null) {
      AdminController.__instance = new AdminController();
    }
    return AdminController.__instance;
  }

  public async action(req: Request, res: Response) {
    return this.__dao.action().then((result) => {
      res.send(result);
    });
  }
}
