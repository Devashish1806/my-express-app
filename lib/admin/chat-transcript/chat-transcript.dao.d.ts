import { BaseDao } from "../../utils/web/base.dao";
export declare class ChatTranscriptDao extends BaseDao {
    private static __instance;
    private constructor();
    static getInstance(): ChatTranscriptDao;
    addLog(transcript: any): Promise<any>;
}
