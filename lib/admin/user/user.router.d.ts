import { Router, Request, Response } from "express";
export declare class UserRouter {
    private static __router;
    private constructor();
    static getInstance(): Router;
    getUsers(req: Request, res: Response): Promise<void>;
    addUser(req: Request, res: Response): Promise<void>;
    init(): void;
}
