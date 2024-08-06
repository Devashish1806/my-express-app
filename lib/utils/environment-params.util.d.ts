export declare class EnvironmentParams {
    private static environment;
    static getEnvironment(): Environment;
    private static initEnvironment;
}
export declare class Environment {
    Name: string;
    Port: string;
    Environment: string;
    MicrosoftAppId: string;
    MicrosoftAppSecret: string;
}
