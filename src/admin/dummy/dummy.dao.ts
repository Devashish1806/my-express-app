import { Logger } from "../../utils/log4js.util";
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

  getData(query: any) {
    Logger.log.debug("Query; ", query);
    const limit = query.limit ? parseInt(query.limit) : undefined;
    let pipeline = [
      {
        $sort: { _id: 1 },
      },
      // {
      //   $skip: parseInt(skip),
      // },
      {
        $limit: limit,
      },
    ];
    return this.aggregate(pipeline);
  }
}
