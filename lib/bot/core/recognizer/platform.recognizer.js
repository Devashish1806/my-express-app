"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformRecognizer = void 0;
const app_context_1 = require("../../../app/app.context");
const platform_base_recognizer_1 = require("./platform.base-recognizer");
const platform_enums_1 = require("../platform.enums");
const dummy_recognizer_1 = require("./nlp-engines/dummy.recognizer");
const clu_recognizer_1 = require("./nlp-engines/clu.recognizer");
const custom_recognizer_1 = require("./nlp-engines/custom.recognizer");
const qna_recognizer_1 = require("./nlp-engines/qna.recognizer");
class PlatformRecognizer extends platform_base_recognizer_1.PlatformBaseRecognizer {
    constructor(botId) {
        super();
        this.__nlpEngines = [];
        if (app_context_1.AppContext.config.nlp[botId].type === "multiple") {
            app_context_1.AppContext.config.nlp[botId].engines.forEach((nlp) => {
                let nlpEngine;
                if (nlp.active) {
                    switch (nlp.type) {
                        case platform_enums_1.NLP.CLU.toLowerCase():
                            nlpEngine = new clu_recognizer_1.CLU(nlp);
                            break;
                        case platform_enums_1.NLP.CUSTOM.toLowerCase():
                            nlpEngine = new custom_recognizer_1.CustomRecognizer(nlp);
                            break;
                        case platform_enums_1.NLP.QNA.toLowerCase():
                            nlpEngine = new qna_recognizer_1.QNARecognizer(nlp);
                            break;
                        case platform_enums_1.NLP.DUMMY.toLowerCase():
                            nlpEngine = new dummy_recognizer_1.DummyNlp(nlp);
                            break;
                        default:
                            throw new Error(`Error in setting up the NLP: ${nlp.type}`);
                    }
                    this.__nlpEngines.push(nlpEngine);
                }
            });
        }
        else {
            const nlp = app_context_1.AppContext.config.nlp[botId].engines;
            let nlpEngine;
            if (nlp.active) {
                switch (nlp.type) {
                    case platform_enums_1.NLP.CLU.toLowerCase():
                        nlpEngine = new clu_recognizer_1.CLU(nlp);
                        break;
                    case platform_enums_1.NLP.CUSTOM.toLowerCase():
                        nlpEngine = new custom_recognizer_1.CustomRecognizer(nlp);
                        break;
                    case platform_enums_1.NLP.QNA.toLowerCase():
                        nlpEngine = new qna_recognizer_1.QNARecognizer(nlp);
                        break;
                    case platform_enums_1.NLP.DUMMY.toLowerCase():
                        nlpEngine = new dummy_recognizer_1.DummyNlp(nlp);
                        break;
                    default:
                        throw new Error(`Error in setting up the NLP: ${nlp.type}`);
                }
                this.__nlpEngines.push(nlpEngine);
            }
            else {
                throw new Error(`Error in setting up the NLP: ${nlp.type} [INACTIVE]`);
            }
        }
    }
    getNLP() {
        return platform_enums_1.NlpEngine.COMPOSITE.toString();
    }
    onRecognize(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPromiseResponses = [];
            for (let nlpEngine of this.__nlpEngines) {
                newPromiseResponses.push(nlpEngine.recognize(context));
            }
            const nlpResponses = yield Promise.all(newPromiseResponses);
            let result = new platform_base_recognizer_1.IntentResult();
            result.topScore = 0;
            for (let nlpResponse of nlpResponses) {
                if (result.topScore < nlpResponse.topScore) {
                    result = nlpResponse;
                }
            }
            return result;
        });
    }
}
exports.PlatformRecognizer = PlatformRecognizer;
//# sourceMappingURL=platform.recognizer.js.map