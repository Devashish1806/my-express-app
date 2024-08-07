import { BaseComponentDialog } from "./base-component.dialog";
import { PlatformBaseRecognizer } from "../core/recognizer/platform.base-recognizer";
export declare class MainDialog extends BaseComponentDialog {
    private __dialogCache;
    private __recognizer;
    constructor(id: string, dialogs: Array<BaseComponentDialog>, recognizer: PlatformBaseRecognizer);
    /**
     * First step in the waterfall dialog. Prompts the user for a command.
     * Currently, this expects a booking request, like "book me a flight from Paris to Berlin on march 22"
     * Note that the sample LUIS model will only recognize Paris, Berlin, New York and London as airport cities.
     */
    private introStep;
    /**
     * Second step in the waterall.  This will use recognizer to attempt to extract the origin, destination and travel dates.
     * Then, it hands off to the bookingDialog child dialog to collect any remaining details.
     */
    private actStep;
    /**
     * This is the final step in the main waterfall dialog.
     * It wraps up the sample "book a flight" interaction with a simple confirmation.
     */
    private finalStep;
    /**
     * The run method handles the incoming activity (in the form of a DialogContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {TurnContext} context
     */
    run(context: any, accessor: any): Promise<void>;
    getNewInstance(): MainDialog;
}
