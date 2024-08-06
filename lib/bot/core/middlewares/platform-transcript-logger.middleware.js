"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformTranscriptLoggerMiddleware = void 0;
const chat_transcript_dao_1 = require("../../../admin/chat-transcript/chat-transcript.dao");
class PlatformTranscriptLoggerMiddleware {
    logActivity(activity) {
        const log = this.logObject(activity);
        chat_transcript_dao_1.ChatTranscriptDao.getInstance().addLog(log);
    }
    logObject(activity) {
        const transcriptObj = {
            type: activity.type,
            id: activity.id,
            timestamp: activity.timestamp,
            localTimestamp: activity.localTimestamp,
            localTimezone: activity.localTimezone,
            callerId: activity.callerId,
            serviceUrl: activity.serviceUrl,
            channelId: activity.channelId,
            from: activity.from,
            conversation: activity.conversation,
            recipient: activity.recipient,
            textFormat: activity.textFormat,
            attachmentLayout: activity.attachmentLayout,
            topicName: activity.topicName,
            locale: activity.locale,
            text: activity.text,
            inputHint: activity.inputHint,
            summary: activity.summary,
            suggestedActions: activity.suggestedActions,
            attachments: activity.attachments,
            entities: activity.entities,
            channelData: activity.channelData, // eslint-disable-line @typescript-eslint/no-explicit-any
            action: activity.action,
            replyToId: activity.replyToId,
            label: activity.label,
            valueType: activity.valueType,
            value: activity.value, // eslint-disable-line @typescript-eslint/no-explicit-any
            name: activity.name,
            relatesTo: activity.relatesTo,
            code: activity.code,
            expiration: activity.expiration,
        };
        return transcriptObj;
    }
}
exports.PlatformTranscriptLoggerMiddleware = PlatformTranscriptLoggerMiddleware;
//# sourceMappingURL=platform-transcript-logger.middleware.js.map