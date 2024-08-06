import { BaseDao } from "../../utils/web/base.dao";
import { UserSchema } from "./user.model";
export declare class UserDao extends BaseDao {
    private static __instance;
    private constructor();
    static getInstance(): UserDao;
    getUsers(): Promise<any>;
    addUser(user: UserSchema): Promise<any>;
}
