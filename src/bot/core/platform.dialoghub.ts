import { MainDialog } from "../dialogs/main.dialog";

export class DialogHub {
  public static async getMainDialog(): Promise<MainDialog> {
    return new MainDialog("main.dialog", [], {});
  }
}
