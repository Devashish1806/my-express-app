import { configure, getLogger } from "log4js";
const log4jsConfig = require("./../../resources/log4js.json");

export class Logger {
  private static createLogger() {
    const logger = getLogger();
    configure(log4jsConfig);
    return logger;
  }

  public static log = Logger.createLogger();
}
