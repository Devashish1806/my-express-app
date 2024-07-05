import { InputHints, MessageFactory } from "botbuilder";
import {
  DialogSet,
  DialogState,
  DialogTurnResult,
  DialogTurnStatus,
  TextPrompt,
  WaterfallDialog,
  WaterfallStepContext,
} from "botbuilder-dialogs";
import { BaseComponentDialog } from "./base-component.dialog";
import {
  IntentResult,
  PlatformBaseRecognizer,
} from "../core/recognizer/platform.base-recognizer";
import { Logger } from "../../utils/log4js.util";

const MAIN_WATERFALL_DIALOG = "mainWaterfallDialog";

export class MainDialog extends BaseComponentDialog {
  private __dialogCache: Map<string, BaseComponentDialog>;
  private __recognizer: PlatformBaseRecognizer;

  constructor(
    id: string,
    dialogs: Array<BaseComponentDialog>,
    recognizer: PlatformBaseRecognizer
  ) {
    super(id);
    this.__dialogCache = new Map<string, BaseComponentDialog>();
    this.__recognizer = recognizer;
    for (let dialog of dialogs) {
      this.addDialog(dialog);
      this.__dialogCache.set(dialog.id, dialog);
    }
    // Define the main dialog and its related components.
    this.addDialog(new TextPrompt("TextPrompt")).addDialog(
      new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
        this.introStep.bind(this),
        this.actStep.bind(this),
        this.finalStep.bind(this),
      ])
    );

    this.initialDialogId = MAIN_WATERFALL_DIALOG;
  }

  /**
   * First step in the waterfall dialog. Prompts the user for a command.
   * Currently, this expects a booking request, like "book me a flight from Paris to Berlin on march 22"
   * Note that the sample LUIS model will only recognize Paris, Berlin, New York and London as airport cities.
   */
  private async introStep(
    stepContext: WaterfallStepContext
  ): Promise<DialogTurnResult> {
    const messageText = (stepContext.options as any).restartMsg
      ? (stepContext.options as any).restartMsg
      : this.template
          .get("en")
          .evaluate("main.dialog.greeting.hi", { name: "Devashish" });
    const promptMessage = MessageFactory.text(
      messageText,
      messageText,
      InputHints.ExpectingInput
    );
    return await stepContext.prompt("TextPrompt", { prompt: promptMessage });
  }

  /**
   * Second step in the waterall.  This will use recognizer to attempt to extract the origin, destination and travel dates.
   * Then, it hands off to the bookingDialog child dialog to collect any remaining details.
   */
  private async actStep(
    stepContext: WaterfallStepContext
  ): Promise<DialogTurnResult> {
    // Call recognizer and gather any potential booking details. (Note the TurnContext has the response to the prompt)
    const intentResult: IntentResult = await this.__recognizer.onRecognize(
      stepContext.context
    );

    if (intentResult) {
      const dialog = this.__dialogCache.get(intentResult.topIntent);
      if (dialog) {
        // Run the BookingDialog passing in whatever details we have from the LUIS call, it will fill out the remainder.
        return await stepContext.beginDialog(dialog.id);
      } else {
        const messageText = this.template
          .get("en")
          .evaluate("main.dialog.sorry.intent", {
            intent: intentResult.topIntent,
          });
        await stepContext.context.sendActivity(
          messageText,
          messageText,
          InputHints.IgnoringInput
        );
      }
    } else {
      Logger.log.error("Error in finding intext");
    }
    return await stepContext.next();
  }

  /**
   * This is the final step in the main waterfall dialog.
   * It wraps up the sample "book a flight" interaction with a simple confirmation.
   */
  private async finalStep(
    stepContext: WaterfallStepContext
  ): Promise<DialogTurnResult> {
    // Restart the main dialog waterfall with a different message the second time around
    return await stepContext.replaceDialog(this.initialDialogId, {
      restartMsg: this.template.get("en").evaluate("main.dialog.restart.msg"),
    });
  }

  /**
   * The run method handles the incoming activity (in the form of a DialogContext) and passes it through the dialog system.
   * If no dialog is active, it will start the default dialog.
   * @param {TurnContext} context
   */
  public async run(context, accessor) {
    Logger.log.info("Main run dialog");
    const dialogSet = new DialogSet(accessor);
    dialogSet.add(this);
    const dialogContext = await dialogSet.createContext(context);
    const results = await dialogContext.continueDialog();
    if (results.status === DialogTurnStatus.empty) {
      await dialogContext.beginDialog(this.id);
    }
  }

  public getNewInstance(): MainDialog {
    throw new Error("Can not create instance of root dialog");
  }
}
