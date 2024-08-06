import { BaseDao } from "../utils/web/base.dao";
export declare class AdminDao extends BaseDao {
    private static __instance;
    static getInstance(): AdminDao;
    action(): Promise<any>;
}
