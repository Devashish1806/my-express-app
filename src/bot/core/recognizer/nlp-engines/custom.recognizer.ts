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

  public onRecognize(context: any): Promise<IntentResult> {
    return;
  }
}
