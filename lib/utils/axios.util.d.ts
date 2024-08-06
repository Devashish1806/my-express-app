import { AxiosResponse } from "axios";
export declare class AxiosUtil {
    private static __instance;
    private static getInstance;
    private static request;
    static get(url: string, headers?: any, params?: any): Promise<AxiosResponse<any, any>>;
    static post(url: string, payload: any, headers?: any, params?: any): Promise<AxiosResponse<any, any>>;
    static put(url: string, payload: any, headers?: any, params?: any): Promise<AxiosResponse<any, any>>;
    static delete(url: string, headers?: any, params?: any): Promise<AxiosResponse<any, any>>;
}
