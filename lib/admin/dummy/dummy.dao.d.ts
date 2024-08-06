import { BaseDao } from "../../utils/web/base.dao";
export declare class DummyDao extends BaseDao {
    private static __instance;
    private constructor();
    static getInstance(): DummyDao;
    getData(query: any): Promise<any>;
}
