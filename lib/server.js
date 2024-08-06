"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const banner_util_1 = require("./utils/banner.util");
const log4js_util_1 = require("./utils/log4js.util");
const admin_router_1 = require("./admin/admin.router");
const app_enums_1 = require("./app/app.enums");
const bot_router_1 = require("./bot/bot.router");
const platform_bootstrap_1 = require("./bot/core/platform.bootstrap");
const app_context_1 = require("./app/app.context");
const job_scheduler_1 = require("./jobs/job.scheduler");
function bootStrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the application context
            const appConfig = app_context_1.AppContext.config.application;
            // get the environment variables
            // const env = EnvironmentParams.getEnvironment();
            // load the banner
            yield banner_util_1.Banner.load(appConfig.name);
            // create app instance
            const app = express();
            app.use(cors({
                origin: "*",
            }));
            app.use(express.json({ limit: "50mb" }));
            app.use(express.urlencoded({ limit: "50mb", extended: true }));
            app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
            app.use(bodyParser.json());
            const modules = new Map();
            modules.set(app_enums_1.Module.ADMIN, new admin_router_1.AdminRouter());
            modules.set(app_enums_1.Module.BOT, new bot_router_1.BotRouter());
            for (let module of modules) {
                app.use(module[1].getBasePath(), module[1].getRouter());
            }
            // initiate platform bots
            const bots = app_context_1.AppContext.config.bot;
            for (let id in bots) {
                if (bots[id].active) {
                    log4js_util_1.Logger.log.info(`Bot [${id}]-[${bots[id].name}] is ACTIVE -- [INITIALIZING]`);
                    yield new platform_bootstrap_1.PlatformBootstrap().init(bots[id]);
                    log4js_util_1.Logger.log.info(`Bot [${id}]-[${bots[id].name}] [INITIALIZED]`);
                }
                else {
                    log4js_util_1.Logger.log.warn(`Bot [${id}]-[${bots[id].name}] is INACTIVE`);
                }
            }
            // starting Job services
            if (app_context_1.AppContext.config.application.job)
                job_scheduler_1.Job.start();
            // start the server
            app.listen(appConfig.port, () => {
                log4js_util_1.Logger.log.info(`Application is up and running at port: ${appConfig.port}`);
            });
        }
        catch (err) {
            log4js_util_1.Logger.log.error("Error in starting the server", err);
        }
    });
}
bootStrap();
//# sourceMappingURL=server.js.map