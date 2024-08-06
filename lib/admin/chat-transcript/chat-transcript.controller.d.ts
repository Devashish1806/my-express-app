import { Request, Response } from "express";
export declare class ChatTranscriptController {
    private static __instance;
    private __dao;
    private constructor();
    static getInstance(): ChatTranscriptController;
    addLog(req: Request, res: Response): Promise<any>;
}
