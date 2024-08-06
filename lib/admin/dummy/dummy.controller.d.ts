import { Request, Response } from "express";
export declare class DummyController {
    private static __instance;
    private __dao;
    private constructor();
    static getInstance(): DummyController;
    getData(req: Request, res: Response): Promise<any>;
}
