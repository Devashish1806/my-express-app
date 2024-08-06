"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyDao = void 0;
const log4js_util_1 = require("../../utils/log4js.util");
const base_dao_1 = require("../../utils/web/base.dao");
class DummyDao extends base_dao_1.BaseDao {
    constructor() {
        super("dummy");
    }
    static getInstance() {
        if (DummyDao.__instance === null) {
            DummyDao.__instance = new DummyDao();
        }
        return DummyDao.__instance;
    }
    getData(query) {
        log4js_util_1.Logger.log.debug("Query; ", query);
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
exports.DummyDao = DummyDao;
DummyDao.__instance = null;
//# sourceMappingURL=dummy.dao.js.map