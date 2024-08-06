import { BaseController } from "../utils/web/base.controller";
import { Request, Response } from "express";
export declare class AdminController extends BaseController {
    private static __instance;
    private __dao;
    private constructor();
    static getInstance(): AdminController;
    action(req: Request, res: Response): Promise<void>;
}
