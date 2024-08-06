import { Router, Request, Response } from "express";
import { BaseRouter } from "../utils/web/base.router";
export declare class BotRouter extends BaseRouter {
    constructor();
    listen(req: Request, res: Response): Promise<void>;
    onInit(router: Router): void;
}
