import { NLP } from "../../platform.enums";
import {
  IntentResult,
  PlatformBaseRecognizer,
} from "../platform.base-recognizer";

export class CLU extends PlatformBaseRecognizer {
  constructor(nlp: any) {
    super();
  }

  public getNLP(): string {
    return NLP.CLU.toString();
  }

  public async onRecognize(context: any): Promise<IntentResult> {
    const intentResult = new IntentResult();
    intentResult.text = context.activity.text || "";
    intentResult.topIntent = "welcome.dialog";
    intentResult.topScore = 90;
    intentResult.nlp = this.getNLP();
    return intentResult;
  }
}
