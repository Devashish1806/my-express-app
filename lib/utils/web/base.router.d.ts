import { Router, Request, Response } from "express";
import { Module } from "../../app/app.enums";
export declare abstract class BaseRouter {
    private module;
    private router;
    constructor(module: Module);
    private init;
    getRouter(): Router;
    getBasePath(): string;
    getModule(): Module;
    healthCheck(req: Request, res: Response): void;
    abstract onInit(router: Router): any;
}
