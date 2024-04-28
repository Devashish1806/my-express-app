import { Logger } from "../../utils/log4js.util";
import { MainDialog } from "../dialogs/main.dialog";
import { IntentResult } from "./recognizer/platform.base-recognizer";
import { PlatformRecognizer } from "./recognizer/platform.recognizer";

export class DialogHub {
  public static async getMainDialog(): Promise<MainDialog> {
    const recognizer = new PlatformRecognizer();
    return new MainDialog("main.dialog", [], recognizer);
  }
}
