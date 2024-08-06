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
exports.ChatTranscriptController = void 0;
const chat_transcript_dao_1 = require("./chat-transcript.dao");
class ChatTranscriptController {
    constructor() {
        this.__dao = chat_transcript_dao_1.ChatTranscriptDao.getInstance();
    }
    static getInstance() {
        if (ChatTranscriptController.__instance == null) {
            ChatTranscriptController.__instance = new ChatTranscriptController();
        }
        return ChatTranscriptController.__instance;
    }
    addLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__dao.addLog(req.body).then((result) => {
                res.send(result);
            });
        });
    }
}
exports.ChatTranscriptController = ChatTranscriptController;
//# sourceMappingURL=chat-transcript.controller.js.map