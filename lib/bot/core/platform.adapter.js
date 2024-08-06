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
exports.PlatformAdapter = void 0;
const botbuilder_1 = require("botbuilder");
const log4js_util_1 = require("../../utils/log4js.util");
const platform_transcript_logger_middleware_1 = require("./middlewares/platform-transcript-logger.middleware");
class PlatformAdapter extends botbuilder_1.CloudAdapter {
    constructor(botFrameworkAuthentication) {
        super(botFrameworkAuthentication);
        super.onTurnError = this.onTurnErrorHandler;
        super.use(new botbuilder_1.TranscriptLoggerMiddleware(new platform_transcript_logger_middleware_1.PlatformTranscriptLoggerMiddleware()));
        // super.use(new GenesysMiddleware());
    }
    preProcessActivity() {
        log4js_util_1.Logger.log.debug("Pre Process");
    }
    postProcessActivity() {
        log4js_util_1.Logger.log.debug("Post Process");
    }
    processMessageActivity(req, res, logic) {
        const _super = Object.create(null, {
            process: { get: () => super.process }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.preProcessActivity();
            _super.process.call(this, req, res, logic);
            this.postProcessActivity();
        });
    }
    // Catch-all for errors.
    onTurnErrorHandler(context, error) {
        return __awaiter(this, void 0, void 0, function* () {
            // This check writes out errors to console log .vs. app insights.
            // NOTE: In production environment, you should consider logging this to Azure
            //       application insights.
            log4js_util_1.Logger.log.error(`\n [onTurnError] unhandled error: ${error}`);
            // Send a trace activity, which will be displayed in Bot Framework Emulator
            yield context.sendTraceActivity("OnTurnError Trace", `${error}`, "https://www.botframework.com/schemas/error", "TurnError");
            // Send a message to the user
            yield context.sendActivity("The bot encountered an error or bug.");
            yield context.sendActivity("To continue to run this bot, please fix the bot source code.");
            // Clear out state
            // await this.conversationState.delete(context);
        });
    }
}
exports.PlatformAdapter = PlatformAdapter;
//# sourceMappingURL=platform.adapter.js.map