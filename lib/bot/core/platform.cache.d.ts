import { PlatformBaseBot } from "./platfrom.base-bot";
export declare class PlatformCache {
    private static __instance;
    private botCache;
    constructor();
    static getInstance(): PlatformCache;
    addBot(bot: PlatformBaseBot): void;
    getBot(botId: string): PlatformBaseBot;
}
