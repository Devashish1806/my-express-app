import { DummyDao } from "./dummy.dao";
import { Request, Response } from "express";

export class DummyController {
  private static __instance: DummyController;
  private __dao: DummyDao;

  private constructor() {
    this.__dao = DummyDao.getInstance();
  }

  public static getInstance() {
    if (DummyController.__instance == null) {
      DummyController.__instance = new DummyController();
    }
    return DummyController.__instance;
  }

  public async getData(req: Request, res: Response): Promise<any> {
    this.__dao.getData(req.query).then((result) => {
      res.send(result);
    });
  }
}
