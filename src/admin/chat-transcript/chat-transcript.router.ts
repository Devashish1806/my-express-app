import { Router, Request, Response } from "express";
import { ChatTranscriptController } from "./chat-transcript.controller";

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

  public async addLog(req: Request, res: Response) {
    ChatTranscriptController.getInstance().addLog(req, res);
  }

  init() {
    UserRouter.__router.post("/log-activity", this.addLog);
  }
}
