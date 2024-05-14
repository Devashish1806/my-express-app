import { BaseDao } from "../../utils/web/base.dao";

export class DummyDao extends BaseDao {
  private static __instance: DummyDao = null;

  private constructor() {
    super("dummy");
  }

  public static getInstance(): DummyDao {
    if (DummyDao.__instance === null) {
      DummyDao.__instance = new DummyDao();
    }
    return DummyDao.__instance;
  }

  getData() {
    return this.findAll();
  }
}
