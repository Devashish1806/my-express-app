import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { EnvironmentParams } from "./utils/environment-params.util";
import { Banner } from "./utils/banner.util";
import { Logger } from "./utils/log4js.util";
import { AdminRouter } from "./admin/admin.router";
import { Module } from "./utils/application.enums";
import { BaseRouter } from "./utils/web/base.router";
import { BotRouter } from "./bot/bot.router";

async function bootStrap() {
  // get the environment variables
  const env = EnvironmentParams.getEnvironment();

  // load the banner
  await Banner.load(env.Name);

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

  // start the server
  app.listen(env.Port, () => {
    Logger.log.info(`Application is up and running at port: ${env.Port}`);
  });
}

bootStrap();
