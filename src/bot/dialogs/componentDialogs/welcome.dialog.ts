import {
  ConfirmPrompt,
  DialogTurnResult,
  TextPrompt,
  WaterfallDialog,
  WaterfallStepContext,
} from "botbuilder-dialogs";
import { BaseComponentDialog } from "../base-component.dialog";

const CONFIRM_PROMPT = "confirmPrompt";
const TEXT_PROMPT = "textPrompt";
const WATERFALL_DIALOG = "waterfallDialog";

export class WelcomeDialog extends BaseComponentDialog {
  constructor(id?: string) {
    super(id || "welcome.dialog");
    this.addDialog(new TextPrompt(TEXT_PROMPT))
      .addDialog(new ConfirmPrompt(CONFIRM_PROMPT))
      .addDialog(
        new WaterfallDialog(WATERFALL_DIALOG, [this.step1.bind(this)])
      );

    this.initialDialogId = WATERFALL_DIALOG;
  }

  /**
   * If a destination city has not been provided, prompt for one.
   */
  private async step1(
    stepContext: WaterfallStepContext
  ): Promise<DialogTurnResult> {
    await stepContext.prompt(TEXT_PROMPT, {
      prompt: "Welcome Dialog initiated.",
    });
    return await stepContext.endDialog("Welcome Dialog ended");
  }

  getNewInstance(): WelcomeDialog {
    return new WelcomeDialog();
  }
}
