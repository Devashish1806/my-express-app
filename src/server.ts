import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { EnvironmentParams } from "./utils/environment-params.util";
import { Banner } from "./utils/banner.util";
import { Logger } from "./utils/log4js.util";
import { AdminRouter } from "./admin/admin.router";
import { Module } from "./app/app.enums";
import { BaseRouter } from "./utils/web/base.router";
import { BotRouter } from "./bot/bot.router";
import { PlatformBootstrap } from "./bot/core/platform.bootstrap";
import { AppContext } from "./app/app.context";

async function bootStrap() {
  // Get the application context
  const appConfig = AppContext.config.application;

  // get the environment variables
  // const env = EnvironmentParams.getEnvironment();

  // load the banner
  await Banner.load(appConfig.Name);

  // create app instance
  const app = express();
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(bodyParser.json());

  const modules = new Map<Module, BaseRouter>();
  modules.set(Module.ADMIN, new AdminRouter());
  modules.set(Module.BOT, new BotRouter());
  for (let module of modules) {
    app.use(module[1].getBasePath(), module[1].getRouter());
  }

  // initiate platform bot
  await new PlatformBootstrap().init("1");

  // start the server
  app.listen(appConfig.Port, () => {
    Logger.log.info(`Application is up and running at port: ${appConfig.Port}`);
  });
}

bootStrap();
