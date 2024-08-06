"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponentDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const app_context_1 = require("../../app/app.context");
class BaseComponentDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor(id) {
        super(id);
    }
    get template() {
        return app_context_1.AppContext.languageTemplate;
    }
}
exports.BaseComponentDialog = BaseComponentDialog;
//# sourceMappingURL=base-component.dialog.js.map