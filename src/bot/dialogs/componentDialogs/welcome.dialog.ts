import { BaseComponentDialog } from "../base-component.dialog";

export class WelcomeDialog extends BaseComponentDialog {
  constructor(id?: string) {
    super(id || "welcome.dialog");
  }

  getNewInstance(): WelcomeDialog {
    return new WelcomeDialog();
  }
}
