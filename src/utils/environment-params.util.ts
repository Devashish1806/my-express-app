import { config } from "dotenv";
import * as path from "path";

export class EnvironmentParams {
  private static environment: Environment;

  public static getEnvironment(): Environment {
    if (!EnvironmentParams.environment) EnvironmentParams.initEnvironment();
    return EnvironmentParams.environment;
  }

  private static initEnvironment() {
    const ENV_FILE = path.join(__dirname, "../../", ".env");
    config({ path: ENV_FILE });
    EnvironmentParams.environment = new Environment();
    EnvironmentParams.environment.Name = process.env.Name;
    EnvironmentParams.environment.Port = process.env.Port;
    EnvironmentParams.environment.Environment = process.env.Environment;
    EnvironmentParams.environment.MicrosoftAppId = process.env.MicrosoftAppId;
    EnvironmentParams.environment.MicrosoftAppSecret =
      process.env.MicrosoftAppSecret;
  }
}

export class Environment {
  Name: string;
  Port: string;
  Environment: string;
  MicrosoftAppId: string;
  MicrosoftAppSecret: string;
}
