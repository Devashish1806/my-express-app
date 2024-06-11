import { Middleware, TurnContext } from "botbuilder";
import { Logger } from "../../../utils/log4js.util";

export class GenesysMiddleware implements Middleware {
  async onTurn(context: TurnContext, next: () => Promise<void>): Promise<void> {
    Logger.log.debug(
      "----------------------Genesys middleware-------------------"
    );
    await next();
  }
}
