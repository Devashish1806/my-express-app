import { Router, Request, Response } from "express";
import { BaseRouter } from "../utils/web/base.router";
export declare class AdminRouter extends BaseRouter {
    constructor();
    onInit(router: Router): void;
    action(req: Request, res: Response): Promise<void>;
}
