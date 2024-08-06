import { Router, Request, Response } from "express";
export declare class DummyRouter {
    private static __router;
    private constructor();
    static getInstance(): Router;
    getData(req: Request, res: Response): Promise<void>;
    init(): void;
}
