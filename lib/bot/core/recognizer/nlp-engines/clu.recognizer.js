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
exports.CLU = void 0;
const platform_enums_1 = require("../../platform.enums");
const platform_base_recognizer_1 = require("../platform.base-recognizer");
class CLU extends platform_base_recognizer_1.PlatformBaseRecognizer {
    constructor(nlp) {
        super();
    }
    getNLP() {
        return platform_enums_1.NLP.CLU.toString();
    }
    onRecognize(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const intentResult = new platform_base_recognizer_1.IntentResult();
            intentResult.text = context.activity.text || "";
            intentResult.topIntent = "welcome.dialog";
            intentResult.topScore = 90;
            intentResult.nlp = this.getNLP();
            return intentResult;
        });
    }
}
exports.CLU = CLU;
//# sourceMappingURL=clu.recognizer.js.map