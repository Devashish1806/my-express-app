import { ChatTranscriptDao } from "./chat-transcript.dao";
import { Request, Response } from "express";

export class ChatTranscriptController {
  private static __instance: ChatTranscriptController;
  private __dao: ChatTranscriptDao;

  private constructor() {
    this.__dao = ChatTranscriptDao.getInstance();
  }

  public static getInstance() {
    if (ChatTranscriptController.__instance == null) {
      ChatTranscriptController.__instance = new ChatTranscriptController();
    }
    return ChatTranscriptController.__instance;
  }

  public async addLog(req: Request, res: Response): Promise<any> {
    this.__dao.addLog(req.body).then((result) => {
      res.send(result);
    });
  }
}
