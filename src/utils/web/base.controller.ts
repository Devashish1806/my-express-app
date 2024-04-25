import { Environment, EnvironmentParams } from "../environment-params.util";

export abstract class BaseController {
  public getEnvironment(): Environment {
    return EnvironmentParams.getEnvironment();
  }
}
