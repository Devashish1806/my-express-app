import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Logger } from "./log4js.util";

export class AxiosUtil {
  private static __instance: AxiosInstance = null;

  private static getInstance(): AxiosInstance {
    if (AxiosUtil.__instance === null) {
      AxiosUtil.__instance = axios.create({
        timeout: 60000,
      });
    }
    return AxiosUtil.__instance;
  }

  private static request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return AxiosUtil.getInstance().request(config);
  }

  public static get(url: string, headers?: any, params?: any) {
    Logger.log.debug(`[GET][URL]: `, url);
    const config: AxiosRequestConfig = {
      url: url,
      method: "get",
      params: params,
      headers: headers,
    };
    return AxiosUtil.request(config);
  }

  public static post(url: string, payload: any, headers?: any, params?: any) {
    Logger.log.debug(`[POST][URL]: `, url);
    const config: AxiosRequestConfig = {
      url: url,
      method: "post",
      params: params,
      headers: headers,
      data: payload,
    };
    return AxiosUtil.request(config);
  }

  public static put(url: string, payload: any, headers?: any, params?: any) {
    Logger.log.debug(`[PUT][URL]: `, url);
    const config: AxiosRequestConfig = {
      url: url,
      method: "put",
      params: params,
      headers: headers,
      data: payload,
    };
    return AxiosUtil.request(config);
  }

  public static delete(url: string, headers?: any, params?: any) {
    Logger.log.debug(`[DELETE][URL]: `, url);
    const config: AxiosRequestConfig = {
      url: url,
      method: "delete",
      params: params,
      headers: headers,
    };
    return AxiosUtil.request(config);
  }
}
