import { ComponentDialog } from "botbuilder-dialogs";
export declare abstract class BaseComponentDialog extends ComponentDialog {
    constructor(id: string);
    get template(): any;
    abstract getNewInstance(): BaseComponentDialog;
}
