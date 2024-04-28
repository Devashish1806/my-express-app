import { NLP } from "../platform.enums";
import { IntentResult, PlatformRecognizer } from "../platform.recognizer";

export class DummyRecognizer extends PlatformRecognizer {
  public getNLP(): string {
    return NLP.DUMMY.toString();
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
