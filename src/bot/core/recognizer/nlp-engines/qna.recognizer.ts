import { NLP } from "../../platform.enums";
import {
  IntentResult,
  PlatformBaseRecognizer,
} from "../platform.base-recognizer";

export class QNARecognizer extends PlatformBaseRecognizer {
  constructor(nlp: any) {
    super();
  }

  public getNLP(): string {
    return NLP.QNA.toString();
  }

  public onRecognize(context: any): Promise<IntentResult> {
    return;
  }
}
