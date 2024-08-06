"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosUtil = void 0;
const axios_1 = require("axios");
const log4js_util_1 = require("./log4js.util");
class AxiosUtil {
    static getInstance() {
        if (AxiosUtil.__instance === null) {
            AxiosUtil.__instance = axios_1.default.create({
                timeout: 60000,
            });
        }
        return AxiosUtil.__instance;
    }
    static request(config) {
        return AxiosUtil.getInstance().request(config);
    }
    static get(url, headers, params) {
        log4js_util_1.Logger.log.debug(`[GET][URL]: `, url);
        const config = {
            url: url,
            method: "get",
            params: params,
            headers: headers,
        };
        return AxiosUtil.request(config);
    }
    static post(url, payload, headers, params) {
        log4js_util_1.Logger.log.debug(`[POST][URL]: `, url);
        const config = {
            url: url,
            method: "post",
            params: params,
            headers: headers,
            data: payload,
        };
        return AxiosUtil.request(config);
    }
    static put(url, payload, headers, params) {
        log4js_util_1.Logger.log.debug(`[PUT][URL]: `, url);
        const config = {
            url: url,
            method: "put",
            params: params,
            headers: headers,
            data: payload,
        };
        return AxiosUtil.request(config);
    }
    static delete(url, headers, params) {
        log4js_util_1.Logger.log.debug(`[DELETE][URL]: `, url);
        const config = {
            url: url,
            method: "delete",
            params: params,
            headers: headers,
        };
        return AxiosUtil.request(config);
    }
}
exports.AxiosUtil = AxiosUtil;
AxiosUtil.__instance = null;
//# sourceMappingURL=axios.util.js.map