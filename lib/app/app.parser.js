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
exports.AppParser = void 0;
const fs_extra_promise_1 = require("fs-extra-promise");
const path_1 = require("path");
const _ = require("lodash");
const yaml = require("js-yaml");
const fs_1 = require("fs");
const log4js_util_1 = require("../utils/log4js.util");
const botbuilder_lg_1 = require("botbuilder-lg");
class AppParser {
    // private __moduleMap: Map<string, any> = null;
    constructor() {
        this.__baseResourcePath = null;
        // private __baseModulePath: string = null;
        this.__config = {};
        this.__environment = null;
        this.__languageTemplate = null;
        this.__environment = this.__parseEnvironment();
        this.__baseResourcePath = (0, path_1.join)(process.cwd(), "resources", this.__environment);
        // this.__baseModulePath = join(process.cwd(), "dist", "modules");
        // this.__moduleMap = new Map<string, any>();
        this.__languageTemplate = new Map();
        this.__parseApplicationConfig(this.__baseResourcePath);
        // this.__loadModules();
    }
    static getInstance() {
        if (AppParser.__instance === null) {
            AppParser.__instance = new AppParser();
            Object.freeze(AppParser.__instance);
        }
        return AppParser.__instance;
    }
    get config() {
        return this.__config;
    }
    get languageTemplate() {
        return this.__languageTemplate;
    }
    __parseEnvironment() {
        let env = "dev";
        process.argv.forEach((value, index) => {
            if (index === 2) {
                try {
                    env = value.split("=")[1];
                }
                catch (err) {
                    log4js_util_1.Logger.log.error(err);
                }
            }
        });
        return env;
    }
    __parseApplicationConfig(resourceFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.__parseConfig(resourceFolder);
            // Load LG template files
            yield this.__parseLanguageTemplates(resourceFolder);
            // this.__parseModules();
        });
    }
    __parseConfig(resourceFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            const configFiles = (0, fs_extra_promise_1.readdirSync)(resourceFolder).filter((file) => {
                return file.match(new RegExp(`(\\w+\\.(?:config\\.(yaml|yml|json)))`, "gi"));
            });
            configFiles.map((file) => {
                let fileObject = {};
                _.merge(fileObject, this.__parseFileObjects((0, path_1.join)(resourceFolder, file)));
                this.__config[file
                    .split(".")[0]
                    .replace(/[\-\_]/gi, "")
                    .toLowerCase()] = fileObject;
            });
        });
    }
    __parseFileObjects(file) {
        if (file.endsWith("yml") || file.endsWith("yaml"))
            return yaml.load((0, fs_1.readFileSync)(file, "utf-8"));
        else
            return (0, fs_extra_promise_1.readJSONSync)(file);
    }
    __parseLanguageTemplates(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lgPath = (0, path_1.join)(path, "lg");
                const lgTemplates = (0, fs_extra_promise_1.readdirSync)(lgPath).filter((file) => file.match(new RegExp(`(\\w+\\.(lg))`, "i")));
                lgTemplates.map((templateFile) => {
                    const templatePath = (0, path_1.join)(lgPath, templateFile);
                    if ((0, fs_1.existsSync)(`${templatePath}`)) {
                        const template = templateFile.split(".")[0].toLowerCase();
                        let templates = botbuilder_lg_1.Templates.parseFile(templatePath);
                        this.__languageTemplate.set(template, templates);
                    }
                });
            }
            catch (err) {
                log4js_util_1.Logger.log.error(`Error parsing templates`, err);
            }
        });
    }
}
exports.AppParser = AppParser;
AppParser.__instance = null;
//# sourceMappingURL=app.parser.js.map