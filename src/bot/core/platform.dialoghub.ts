import { AppContext } from "../../app/app.context";
import { Logger } from "../../utils/log4js.util";
import { BaseComponentDialog } from "../dialogs/base-component.dialog";
import { LiveagentDialog } from "../dialogs/componentDialogs/liveagent.dialog";
import { WelcomeDialog } from "../dialogs/componentDialogs/welcome.dialog";
import { MainDialog } from "../dialogs/main.dialog";
import { PlatformRecognizer } from "./recognizer/platform.recognizer";

export class DialogHub {
  private static __dialogCache: Map<string, BaseComponentDialog> = null;

  private static getDialogs(): Map<string, BaseComponentDialog> {
    if (!DialogHub.__dialogCache) {
      DialogHub.__dialogCache = new Map<string, BaseComponentDialog>();
      DialogHub.__dialogCache.set(
        "welcome.dialog",
        new WelcomeDialog("welcome.dialog")
      );
      DialogHub.__dialogCache.set(
        "liveagent.dialog",
        new LiveagentDialog("liveagent.dialog")
      );
    }
    return DialogHub.__dialogCache;
  }

  public static async getMainDialog(botId: string): Promise<MainDialog> {
    const recognizer = new PlatformRecognizer(botId);
    const dialogs: Array<BaseComponentDialog> = [];
    const intents: Array<string> = AppContext.config.dialogs[botId].intents;
    for (let intent in intents) {
      const dialog = DialogHub.getDialogs().get(intents[intent]);
      if (dialog) {
        Logger.log.debug(`Bot: [${botId}] [DIALOG FOUND] ${intents[intent]}`);
        dialogs.push(dialog.getNewInstance());
      } else {
        Logger.log.warn(
          `Bot: [${botId}] [DIALOG NOT FOUND] ${intents[intent]}`
        );
      }
    }
    return new MainDialog(`${botId}.main.dialog`, dialogs, recognizer);
  }
}
