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
exports.ChatTranscriptDao = void 0;
const base_dao_1 = require("../../utils/web/base.dao");
class ChatTranscriptDao extends base_dao_1.BaseDao {
    constructor() {
        super("chat-transcript");
    }
    static getInstance() {
        if (ChatTranscriptDao.__instance === null) {
            ChatTranscriptDao.__instance = new ChatTranscriptDao();
        }
        return ChatTranscriptDao.__instance;
    }
    addLog(transcript) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.add(transcript);
        });
    }
}
exports.ChatTranscriptDao = ChatTranscriptDao;
ChatTranscriptDao.__instance = null;
//# sourceMappingURL=chat-transcript.dao.js.map