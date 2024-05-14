import { Router, Request, Response } from "express";
import { DummyController } from "./dummy.controller";

export class DummyRouter {
  private static __router: Router = null;

  private constructor() {
    DummyRouter.__router = Router();
  }

  public static getInstance(): Router {
    if (DummyRouter.__router === null) {
      new DummyRouter().init();
    }
    return DummyRouter.__router;
  }

  public async getData(req: Request, res: Response) {
    DummyController.getInstance().getData(req, res);
  }

  init() {
    DummyRouter.__router.get("/", this.getData);
  }
}
