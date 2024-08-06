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
exports.IntentResult = exports.PlatformBaseRecognizer = void 0;
const log4js_util_1 = require("../../../utils/log4js.util");
class PlatformBaseRecognizer {
    recognize(context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.preProcess(context);
                const intentResult = yield this.onRecognize(context);
                intentResult.nlp = this.getNLP();
                this.postProcess(intentResult);
                return intentResult;
            }
            catch (err) {
                log4js_util_1.Logger.log.error(`Error with the recognizer`, err);
                throw new Error(err);
            }
        });
    }
    getUtterance(context) {
        const utterance = context.activity.text || "";
        return utterance;
    }
    preProcess(context) {
        log4js_util_1.Logger.log.debug(`[${this.getNLP()}] user utterance: ${this.getUtterance(context)}`);
    }
    postProcess(intentResult) {
        log4js_util_1.Logger.log.debug(`[${this.getNLP()}] Intent Result: ${intentResult.topIntent}`);
    }
}
exports.PlatformBaseRecognizer = PlatformBaseRecognizer;
class IntentResult {
}
exports.IntentResult = IntentResult;
//# sourceMappingURL=platform.base-recognizer.js.map