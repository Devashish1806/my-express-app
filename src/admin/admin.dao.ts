import { BaseDao } from "../utils/web/base.dao";

export class AdminDao extends BaseDao {
  private static __instance: AdminDao = null;

  static getNewInstance(): AdminDao {
    if (AdminDao.__instance === null) {
      AdminDao.__instance = new AdminDao("admin");
    }
    return AdminDao.__instance;
  }

  public async action(): Promise<any> {
    return { error: "error in your request" };
  }
}
