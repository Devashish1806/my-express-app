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
exports.LiveagentDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const base_component_dialog_1 = require("../base-component.dialog");
const botbuilder_1 = require("botbuilder");
const CONFIRM_PROMPT = "confirmPrompt";
const TEXT_PROMPT = "textPrompt";
const WATERFALL_DIALOG = "waterfallDialog";
class LiveagentDialog extends base_component_dialog_1.BaseComponentDialog {
    constructor(id) {
        super(id || "liveagent.dialog");
        this.addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT))
            .addDialog(new botbuilder_dialogs_1.ConfirmPrompt(CONFIRM_PROMPT))
            .addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [
            this.step1.bind(this),
            this.step2.bind(this),
        ]));
        this.initialDialogId = WATERFALL_DIALOG;
    }
    /**
     * If a destination city has not been provided, prompt for one.
     */
    step1(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            yield stepContext.context.sendActivity("Liveagent Dialog initiated.", "Liveagent Dialog initiated.", botbuilder_1.InputHints.IgnoringInput);
            const promptMessage = botbuilder_1.MessageFactory.text("Please enter something", "Please enter something", botbuilder_1.InputHints.ExpectingInput);
            return yield stepContext.prompt("TextPrompt", { prompt: promptMessage });
        });
    }
    step2(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            yield stepContext.context.sendActivity("Liveagent Dialog end step.", "Liveagent Dialog end step.", botbuilder_1.InputHints.IgnoringInput);
            return yield stepContext.endDialog("Liveagent Dialog ended");
        });
    }
    getNewInstance() {
        return new LiveagentDialog();
    }
}
exports.LiveagentDialog = LiveagentDialog;
//# sourceMappingURL=liveagent.dialog.js.map