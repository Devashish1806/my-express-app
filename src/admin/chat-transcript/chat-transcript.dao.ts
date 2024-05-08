import { BaseDao } from "../../utils/web/base.dao";
import { ChatTranscriptSchema } from "./chat-transcript.model";

export class ChatTranscriptDao extends BaseDao {
  private static __instance: ChatTranscriptDao = null;
  private constructor() {
    super("chat-transcript");
  }

  public static getInstance(): ChatTranscriptDao {
    if (ChatTranscriptDao.__instance === null) {
      ChatTranscriptDao.__instance = new ChatTranscriptDao();
    }
    return ChatTranscriptDao.__instance;
  }

  public async addLog(transcript: any) {
    return this.add(transcript);
  }
}
