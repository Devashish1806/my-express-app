import { Logger } from "../../utils/log4js.util";
import { BaseComponentDialog } from "../dialogs/base-component.dialog";
import { MainDialog } from "../dialogs/main.dialog";
import { PlatformRecognizer } from "./recognizer/platform.recognizer";

export class DialogHub {
  public static async getMainDialog(botId: string): Promise<MainDialog> {
    const recognizer = new PlatformRecognizer(botId);
    const dialogs: Array<BaseComponentDialog> = [];
    return new MainDialog(`${botId}.main.dialog`, dialogs, recognizer);
  }
}
