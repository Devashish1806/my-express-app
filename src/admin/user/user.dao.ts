import { BaseDao } from "../../utils/web/base.dao";
import { UserSchema } from "./user.model";

export class UserDao extends BaseDao {
  private static __instance: UserDao = null;
  private constructor() {
    super("user");
  }

  public static getNewInstance(): UserDao {
    if (UserDao.__instance === null) {
      UserDao.__instance = new UserDao();
    }
    return UserDao.__instance;
  }

  public async getUsers() {
    return this.findAll();
  }

  public async addUser(user: UserSchema) {
    user.date = new Date();
    return this.add(user);
  }
}
