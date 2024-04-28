import { Logger } from "../../utils/log4js.util";

export abstract class PlatformRecognizer {
  public async recognize(context: any): Promise<IntentResult> {
    try {
      this.preProcess(context);
      const intentResult = await this.onRecognize(context);
      intentResult.nlp = this.getNLP();
      this.postProcess(intentResult);
      return intentResult;
    } catch (err) {
      Logger.log.error(`Error with the recognizer`, err);
    }
  }

  public getUtterance(context: any) {
    const utterance: string = context.activity.text || "";
    return utterance;
  }

  public preProcess(context: any) {
    Logger.log.debug(
      `[${this.getNLP()}] user utterance: ${this.getUtterance(context)}`
    );
  }

  public postProcess(intentResult: IntentResult) {
    Logger.log.debug(
      `[${this.getNLP()}] Intent Result: ${intentResult.topIntent}`
    );
  }

  public abstract getNLP(): string;
  public abstract onRecognize(context: any): Promise<IntentResult>;
}

export class IntentResult {
  public text: string;
  public intents: { [name: string]: { score: number } };
  public entities?: any;
  public topIntent: string;
  public topScore: number;
  public nlp: string;
}
