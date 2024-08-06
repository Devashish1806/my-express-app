import { BaseComponentDialog } from "../base-component.dialog";
export declare class WelcomeDialog extends BaseComponentDialog {
    constructor(id?: string);
    /**
     * If a destination city has not been provided, prompt for one.
     */
    private step1;
    private step2;
    getNewInstance(): WelcomeDialog;
}
