import { CloudAdapter, ConfigurationBotFrameworkAuthentication, Request, Response, TurnContext } from "botbuilder";
export declare class PlatformAdapter extends CloudAdapter {
    constructor(botFrameworkAuthentication: ConfigurationBotFrameworkAuthentication);
    private preProcessActivity;
    private postProcessActivity;
    processMessageActivity(req: Request<Record<string, unknown>, Record<string, string | string[]>>, res: Response, logic: (context: TurnContext) => Promise<void>): Promise<void>;
    onTurnErrorHandler(context: any, error: any): Promise<void>;
}
