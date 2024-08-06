import { IntentResult, PlatformBaseRecognizer } from "../platform.base-recognizer";
export declare class CLU extends PlatformBaseRecognizer {
    constructor(nlp: any);
    getNLP(): string;
    onRecognize(context: any): Promise<IntentResult>;
}
