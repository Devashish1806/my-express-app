import {
  CloudAdapter,
  ConfigurationBotFrameworkAuthentication,
  Request,
  Response,
  TranscriptLoggerMiddleware,
  TurnContext,
} from "botbuilder";
import { Logger } from "../../utils/log4js.util";
import { PlatformTranscriptLoggerMiddleware } from "./middlewares/platform-transcript-logger.middleware";
import { GenesysMiddleware } from "./middlewares/genesys.middleware";

export class PlatformAdapter extends CloudAdapter {
  constructor(
    botFrameworkAuthentication: ConfigurationBotFrameworkAuthentication
  ) {
    super(botFrameworkAuthentication);
    super.onTurnError = this.onTurnErrorHandler;
    super.use(
      new TranscriptLoggerMiddleware(new PlatformTranscriptLoggerMiddleware())
    );
    // super.use(new GenesysMiddleware());
  }

  private preProcessActivity() {
    Logger.log.debug("Pre Process");
  }

  private postProcessActivity() {
    Logger.log.debug("Post Process");
  }

  public async processMessageActivity(
    req: Request<Record<string, unknown>, Record<string, string | string[]>>,
    res: Response,
    logic: (context: TurnContext) => Promise<void>
  ): Promise<void> {
    this.preProcessActivity();
    super.process(req, res, logic);
    this.postProcessActivity();
  }

  // Catch-all for errors.
  async onTurnErrorHandler(context, error) {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    Logger.log.error(`\n [onTurnError] unhandled error: ${error}`);

    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
      "OnTurnError Trace",
      `${error}`,
      "https://www.botframework.com/schemas/error",
      "TurnError"
    );

    // Send a message to the user
    await context.sendActivity("The bot encountered an error or bug.");
    await context.sendActivity(
      "To continue to run this bot, please fix the bot source code."
    );
    // Clear out state
    // await this.conversationState.delete(context);
  }
}
