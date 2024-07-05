import { ComponentDialog } from "botbuilder-dialogs";
import { AppContext } from "../../app/app.context";

export abstract class BaseComponentDialog extends ComponentDialog {
  constructor(id: string) {
    super(id);
  }

  public get template() {
    return AppContext.languageTemplate;
  }

  abstract getNewInstance(): BaseComponentDialog;
}
