export declare abstract class PlatformBaseRecognizer {
    recognize(context: any): Promise<IntentResult>;
    getUtterance(context: any): string;
    preProcess(context: any): void;
    postProcess(intentResult: IntentResult): void;
    abstract getNLP(): string;
    abstract onRecognize(context: any): Promise<IntentResult>;
}
export declare class IntentResult {
    text: string;
    intents: {
        [name: string]: {
            score: number;
        };
    };
    entities?: any;
    topIntent: string;
    topScore: number;
    nlp: string;
}
