import { Logger } from "../utils/log4js.util";
import { AppParser } from "./app.parser";

export class AppContext {
  private static __instance: AppContext = null;
  private __parserInstance: any = null;

  private constructor() {
    this.__parserInstance = AppParser.getInstance();
  }

  static getInstance(): AppContext {
    if (AppContext.__instance === null) {
      AppContext.__instance = new AppContext();
      Object.freeze(AppContext.__instance);
    }
    return AppContext.__instance;
  }

  static get config() {
    return this.getInstance().__parserInstance.config;
  }

  static get languageTemplate() {
    return this.getInstance().__parserInstance.languageTemplate;
  }

  static get modules() {
    return this.getInstance().__parserInstance.config.modules;
  }
}
