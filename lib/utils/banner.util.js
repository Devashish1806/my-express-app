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
exports.Banner = void 0;
const figlet = require("figlet");
const log4js_util_1 = require("./log4js.util");
class Banner {
    static load(appName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                figlet(appName, (err, data) => {
                    if (err) {
                        log4js_util_1.Logger.log.error("Error in loading banner", err);
                        reject(err);
                    }
                    console.log(data);
                    resolve(data);
                });
            }));
        });
    }
}
exports.Banner = Banner;
//# sourceMappingURL=banner.util.js.map