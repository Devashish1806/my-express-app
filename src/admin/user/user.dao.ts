import mongoose from "mongoose";
import { BaseDao } from "../../utils/web/base.dao";

export class UserDao extends BaseDao {
  private static __instance: UserDao = null;
  private constructor() {
    super("postmodels");
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
}
