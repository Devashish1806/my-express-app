import { Templates } from "botbuilder-lg";
export declare class AppParser {
    private static __instance;
    private __baseResourcePath;
    private __config;
    private __environment;
    private __languageTemplate;
    private constructor();
    static getInstance(): AppParser;
    get config(): any;
    get languageTemplate(): Map<string, Templates>;
    private __parseEnvironment;
    private __parseApplicationConfig;
    private __parseConfig;
    private __parseFileObjects;
    private __parseLanguageTemplates;
}
