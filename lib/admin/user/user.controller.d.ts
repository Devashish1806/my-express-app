import { Request, Response } from "express";
export declare class UserController {
    private static __instance;
    private __dao;
    private constructor();
    static getInstance(): UserController;
    getUsers(req: Request, res: Response): Promise<any>;
    addUser(req: Request, res: Response): Promise<any>;
}
