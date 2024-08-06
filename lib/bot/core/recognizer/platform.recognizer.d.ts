import { IntentResult, PlatformBaseRecognizer } from "./platform.base-recognizer";
export declare class PlatformRecognizer extends PlatformBaseRecognizer {
    private __nlpEngines;
    constructor(botId: string);
    getNLP(): string;
    onRecognize(context: any): Promise<IntentResult>;
}
