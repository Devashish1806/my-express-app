import { Middleware, TurnContext } from "botbuilder";
export declare class GenesysMiddleware implements Middleware {
    onTurn(context: TurnContext, next: () => Promise<void>): Promise<void>;
}
