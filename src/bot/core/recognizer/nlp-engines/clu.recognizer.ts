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

  public onRecognize(context: any): Promise<IntentResult> {
    return;
  }
}
