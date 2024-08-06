export declare class AppContext {
    private static __instance;
    private __parserInstance;
    private constructor();
    static getInstance(): AppContext;
    static get config(): any;
    static get languageTemplate(): any;
    static get modules(): any;
}
