import { IntentResult, PlatformBaseRecognizer } from "../platform.base-recognizer";
export declare class CustomRecognizer extends PlatformBaseRecognizer {
    constructor(nlp: any);
    getNLP(): string;
    onRecognize(context: any): Promise<IntentResult>;
}
