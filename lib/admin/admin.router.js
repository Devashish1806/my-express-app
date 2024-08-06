"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const base_router_1 = require("../utils/web/base.router");
const app_enums_1 = require("../app/app.enums");
const user_router_1 = require("./user/user.router");
const admin_controller_1 = require("./admin.controller");
const dummy_router_1 = require("./dummy/dummy.router");
class AdminRouter extends base_router_1.BaseRouter {
    constructor() {
        super(app_enums_1.Module.ADMIN);
    }
    onInit(router) {
        router.get("/action", this.action);
        router.use("/user", user_router_1.UserRouter.getInstance());
        router.use("/dummy", dummy_router_1.DummyRouter.getInstance());
    }
    action(req, res) {
        return admin_controller_1.AdminController.getInstance().action(req, res);
    }
}
exports.AdminRouter = AdminRouter;
//# sourceMappingURL=admin.router.js.map