import { AppContext } from "../../../app/app.context";
import {
  IntentResult,
  PlatformBaseRecognizer,
} from "./platform.base-recognizer";
import { NLP, NlpEngine } from "../platform.enums";
import { Logger } from "../../../utils/log4js.util";
import { DummyNlp } from "./nlp-engines/dummy.recognizer";
import { CLU } from "./nlp-engines/clu.recognizer";
import { CustomRecognizer } from "./nlp-engines/custom.recognizer";
import { QNARecognizer } from "./nlp-engines/qna.recognizer";

export class PlatformRecognizer extends PlatformBaseRecognizer {
  private __nlpEngines: Array<PlatformBaseRecognizer>;

  constructor(botId: string) {
    super();
    this.__nlpEngines = [];
    AppContext.config.nlp[botId].engines.forEach((nlp: any) => {
      let nlpEngine: PlatformBaseRecognizer;
      if (nlp.active) {
        switch (nlp.type) {
          case NLP.CLU.toLowerCase():
            nlpEngine = new CLU(nlp);
            break;
          case NLP.CUSTOM.toLowerCase():
            nlpEngine = new CustomRecognizer(nlp);
            break;
          case NLP.QNA.toLowerCase():
            nlpEngine = new QNARecognizer(nlp);
            break;
          default:
            nlpEngine = new DummyNlp(nlp);
            break;
        }
        this.__nlpEngines.push(nlpEngine);
      }
    });
  }

  public getNLP(): string {
    return NlpEngine.COMPOSITE.toString();
  }

  public async onRecognize(context: any): Promise<IntentResult> {
    const newPromiseResponses = [];
    for (let nlpEngine of this.__nlpEngines) {
      newPromiseResponses.push(nlpEngine.onRecognize(context));
    }
    const nlpResponses: Array<IntentResult> = await Promise.all(
      newPromiseResponses
    );

    let result = new IntentResult();
    result.topScore = 0;
    for (let nlpResponse of nlpResponses) {
      if (result.topScore < nlpResponse.topScore) {
        result = nlpResponse;
      }
    }
    return result;
  }
}
