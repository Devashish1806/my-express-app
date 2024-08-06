"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesysMiddleware = void 0;
const log4js_util_1 = require("../../../utils/log4js.util");
class GenesysMiddleware {
    onTurn(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            log4js_util_1.Logger.log.debug("----------------------Genesys middleware-------------------");
            yield next();
        });
    }
}
exports.GenesysMiddleware = GenesysMiddleware;
//# sourceMappingURL=genesys.middleware.js.map