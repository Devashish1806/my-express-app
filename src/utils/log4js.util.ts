import { configure, getLogger } from "log4js";
import { AppContext } from "../app/app.context";

export class Logger {
  private static createLogger() {
    const logger = getLogger();
    configure(AppContext.config.log4js);
    return logger;
  }

  public static log = Logger.createLogger();
}
