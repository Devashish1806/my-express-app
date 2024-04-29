import * as figlet from "figlet";
import { Logger } from "./log4js.util";

export class Banner {
  static async load(appName: string) {
    return new Promise(async (resolve, reject) => {
      figlet(appName, (err: any, data: any) => {
        if (err) {
          Logger.log.error("Error in loading banner", err);
          reject(err);
        }
        console.log(data);
        resolve(data);
      });
    });
  }
}
