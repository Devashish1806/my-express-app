import { Activity, TranscriptLogger } from "botbuilder";
export declare class PlatformTranscriptLoggerMiddleware implements TranscriptLogger {
    logActivity(activity: Activity): void | Promise<void>;
    private logObject;
}
