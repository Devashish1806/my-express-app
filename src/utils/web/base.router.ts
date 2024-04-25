import { Router, Request, Response } from "express";
import { Logger } from "../log4js.util";
import { Module } from "../application.enums";

export abstract class BaseRouter {
  private router: Router;
  constructor(private module: Module) {
    this.router = Router();
    this.init();
  }

  private init(): Router {
    this.router.get("/health", this.healthCheck);
    Logger.log.debug(`BaseRouters ${this.module}`);
    this.onInit(this.router);
    return;
  }

  public getRouter(): Router {
    return this.router;
  }

  public getBasePath(): string {
    const path = `/my-app/${this.module}`;
    Logger.log.debug(`Base path ${path}`);
    return path;
  }

  public getModule(): Module {
    return this.module;
  }

  public healthCheck(req: Request, res: Response) {
    res.status(200).send(`Service is up and alive !!!`);
  }

  abstract onInit(router: Router);
}
