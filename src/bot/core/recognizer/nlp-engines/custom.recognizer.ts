import { NLP } from "../../platform.enums";
import {
  IntentResult,
  PlatformBaseRecognizer,
} from "../platform.base-recognizer";

export class CustomRecognizer extends PlatformBaseRecognizer {
  constructor(nlp: any) {
    super();
  }

  public getNLP(): string {
    return NLP.CUSTOM.toString();
  }

  public async onRecognize(context: any): Promise<IntentResult> {
    const utterance = this.getUtterance(context);
    const intentResult = new IntentResult();
    intentResult.text = utterance;
    if (utterance.toLowerCase().includes("liveagent")) {
      intentResult.topIntent = "liveagent.dialog";
    } else {
      intentResult.topIntent = "welcome.dialog";
    }
    intentResult.topScore = 90;
    intentResult.nlp = this.getNLP();
    return intentResult;
  }
}
