"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QNARecognizer = void 0;
const platform_enums_1 = require("../../platform.enums");
const platform_base_recognizer_1 = require("../platform.base-recognizer");
class QNARecognizer extends platform_base_recognizer_1.PlatformBaseRecognizer {
    constructor(nlp) {
        super();
    }
    getNLP() {
        return platform_enums_1.NLP.QNA.toString();
    }
    onRecognize(context) {
        return;
    }
}
exports.QNARecognizer = QNARecognizer;
//# sourceMappingURL=qna.recognizer.js.map