import { ComponentDialog } from "botbuilder-dialogs";

export abstract class BaseComponentDialog extends ComponentDialog {
  constructor(id: string) {
    super(id);
  }

  abstract getNewInstance(): BaseComponentDialog;
}
