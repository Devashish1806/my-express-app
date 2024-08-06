"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainDialog = void 0;
const botbuilder_1 = require("botbuilder");
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const base_component_dialog_1 = require("./base-component.dialog");
const log4js_util_1 = require("../../utils/log4js.util");
const MAIN_WATERFALL_DIALOG = "mainWaterfallDialog";
class MainDialog extends base_component_dialog_1.BaseComponentDialog {
    constructor(id, dialogs, recognizer) {
        super(id);
        this.__dialogCache = new Map();
        this.__recognizer = recognizer;
        for (let dialog of dialogs) {
            this.addDialog(dialog);
            this.__dialogCache.set(dialog.id, dialog);
        }
        // Define the main dialog and its related components.
        this.addDialog(new botbuilder_dialogs_1.TextPrompt("TextPrompt")).addDialog(new botbuilder_dialogs_1.WaterfallDialog(MAIN_WATERFALL_DIALOG, [
            this.introStep.bind(this),
            this.actStep.bind(this),
            this.finalStep.bind(this),
        ]));
        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }
    /**
     * First step in the waterfall dialog. Prompts the user for a command.
     * Currently, this expects a booking request, like "book me a flight from Paris to Berlin on march 22"
     * Note that the sample LUIS model will only recognize Paris, Berlin, New York and London as airport cities.
     */
    introStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageText = stepContext.options.restartMsg
                ? stepContext.options.restartMsg
                : this.template
                    .get("en")
                    .evaluate("main.dialog.greeting.hi", { name: "Devashish" });
            const promptMessage = botbuilder_1.MessageFactory.text(messageText, messageText, botbuilder_1.InputHints.ExpectingInput);
            return yield stepContext.prompt("TextPrompt", { prompt: promptMessage });
        });
    }
    /**
     * Second step in the waterall.  This will use recognizer to attempt to extract the origin, destination and travel dates.
     * Then, it hands off to the bookingDialog child dialog to collect any remaining details.
     */
    actStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            // Call recognizer and gather any potential booking details. (Note the TurnContext has the response to the prompt)
            const intentResult = yield this.__recognizer.onRecognize(stepContext.context);
            if (intentResult) {
                const dialog = this.__dialogCache.get(intentResult.topIntent);
                if (dialog) {
                    // Run the BookingDialog passing in whatever details we have from the LUIS call, it will fill out the remainder.
                    return yield stepContext.beginDialog(dialog.id);
                }
                else {
                    const messageText = this.template
                        .get("en")
                        .evaluate("main.dialog.sorry.intent", {
                        intent: intentResult.topIntent,
                    });
                    yield stepContext.context.sendActivity(messageText, messageText, botbuilder_1.InputHints.IgnoringInput);
                }
            }
            else {
                log4js_util_1.Logger.log.error("Error in finding intext");
            }
            return yield stepContext.next();
        });
    }
    /**
     * This is the final step in the main waterfall dialog.
     * It wraps up the sample "book a flight" interaction with a simple confirmation.
     */
    finalStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            // Restart the main dialog waterfall with a different message the second time around
            return yield stepContext.replaceDialog(this.initialDialogId, {
                restartMsg: this.template.get("en").evaluate("main.dialog.restart.msg"),
            });
        });
    }
    /**
     * The run method handles the incoming activity (in the form of a DialogContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {TurnContext} context
     */
    run(context, accessor) {
        return __awaiter(this, void 0, void 0, function* () {
            log4js_util_1.Logger.log.info("Main run dialog");
            const dialogSet = new botbuilder_dialogs_1.DialogSet(accessor);
            dialogSet.add(this);
            const dialogContext = yield dialogSet.createContext(context);
            const results = yield dialogContext.continueDialog();
            if (results.status === botbuilder_dialogs_1.DialogTurnStatus.empty) {
                yield dialogContext.beginDialog(this.id);
            }
        });
    }
    getNewInstance() {
        throw new Error("Can not create instance of root dialog");
    }
}
exports.MainDialog = MainDialog;
//# sourceMappingURL=main.dialog.js.map