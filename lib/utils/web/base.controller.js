"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const environment_params_util_1 = require("../environment-params.util");
class BaseController {
    getEnvironment() {
        return environment_params_util_1.EnvironmentParams.getEnvironment();
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map