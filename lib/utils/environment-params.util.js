"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = exports.EnvironmentParams = void 0;
const dotenv_1 = require("dotenv");
const path = require("path");
class EnvironmentParams {
    static getEnvironment() {
        if (!EnvironmentParams.environment)
            EnvironmentParams.initEnvironment();
        return EnvironmentParams.environment;
    }
    static initEnvironment() {
        const ENV_FILE = path.join(__dirname, "../../", ".env");
        (0, dotenv_1.config)({ path: ENV_FILE });
        EnvironmentParams.environment = new Environment();
        EnvironmentParams.environment.Name = process.env.Name;
        EnvironmentParams.environment.Port = process.env.Port;
        EnvironmentParams.environment.Environment = process.env.Environment;
        EnvironmentParams.environment.MicrosoftAppId = process.env.MicrosoftAppId;
        EnvironmentParams.environment.MicrosoftAppSecret =
            process.env.MicrosoftAppSecret;
    }
}
exports.EnvironmentParams = EnvironmentParams;
class Environment {
}
exports.Environment = Environment;
//# sourceMappingURL=environment-params.util.js.map