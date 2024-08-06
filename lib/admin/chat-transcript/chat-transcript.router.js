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
exports.UserRouter = void 0;
const express_1 = require("express");
const chat_transcript_controller_1 = require("./chat-transcript.controller");
class UserRouter {
    constructor() {
        UserRouter.__router = (0, express_1.Router)();
    }
    static getInstance() {
        if (UserRouter.__router === null) {
            new UserRouter().init();
        }
        return UserRouter.__router;
    }
    addLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            chat_transcript_controller_1.ChatTranscriptController.getInstance().addLog(req, res);
        });
    }
    init() {
        UserRouter.__router.post("/log-activity", this.addLog);
    }
}
exports.UserRouter = UserRouter;
UserRouter.__router = null;
//# sourceMappingURL=chat-transcript.router.js.map