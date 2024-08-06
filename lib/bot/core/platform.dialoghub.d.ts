import { MainDialog } from "../dialogs/main.dialog";
export declare class DialogHub {
    private static __dialogCache;
    private static getDialogs;
    static getMainDialog(botId: string): Promise<MainDialog>;
}
